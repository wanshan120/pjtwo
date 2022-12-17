package movie

import (
	"api_main/configs"
	"api_main/v1/responses"
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"

	// "go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var movieCollection *mongo.Collection = configs.GetCollection(configs.DB, "movies")
var validate = validator.New()

func CreateMovieItem() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		var movieRead Movie

		//validate the request body
		if err := c.BindJSON(&movieRead); err != nil {
			c.JSON(
				http.StatusBadRequest,
				responses.ErrorResponse{
					Status:  http.StatusBadRequest,
					Message: "JSON error",
					Data:    map[string]interface{}{"data": err.Error()},
				},
			)
			fmt.Println(err)
			return
		}

		// nested stringify Objectid to Objectid
		movieWrite := MovieWrite{}
		for i := range movieRead.TagIds {
			oid, err := primitive.ObjectIDFromHex(movieRead.TagIds[i])
			if err != nil {
				panic(err)
			}
			// movieWrite.TagIds = append(movieWrite.TagIds, &WId{Id: oid})
			movieWrite.TagIds = append(movieWrite.TagIds, oid)

		}

		//use the validator library to validate required fields
		if validationErr := validate.Struct(&movieRead); validationErr != nil {
			c.JSON(
				http.StatusBadRequest,
				responses.ErrorResponse{
					Status:  http.StatusBadRequest,
					Message: "struct error",
					Data:    map[string]interface{}{"data": validationErr.Error(), "response": movieRead},
				},
			)
			return
		}

		newMovie := MovieWrite{
			Id:          primitive.NewObjectID(),
			Title:       movieRead.Title,
			ContentType: movieRead.ContentType,
			Rates:       movieRead.Rates,
			TagIds:      movieWrite.TagIds,
		}

		result, err := movieCollection.InsertOne(ctx, newMovie)
		if err != nil {
			c.JSON(
				http.StatusInternalServerError,
				responses.ErrorResponse{
					Status:  http.StatusInternalServerError,
					Message: "insert error",
					Data:    map[string]interface{}{"data": err.Error()},
				},
			)
			return
		}

		c.JSON(
			http.StatusCreated,
			responses.ErrorResponse{
				Status:  http.StatusCreated,
				Message: "success",
				Data:    map[string]interface{}{"data": result},
			},
		)
	}
}

func GetMovieById() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		movieId := c.Param("movieId")

		// mongo id object check
		objId, err := primitive.ObjectIDFromHex(movieId)
		if err != nil {
			c.JSON(
				http.StatusBadRequest,
				responses.ErrorResponse{
					Status:  http.StatusBadRequest,
					Message: "movieId can't decoded",
					Data:    map[string]interface{}{"data": err.Error()},
				},
			)
			return
		}

		// var cursor *mongo.Cursor
		pipeline := bson.A{
			bson.D{{Key: "$match", Value: bson.D{{Key: "_id", Value: objId}}}},
			bson.D{{Key: "$limit", Value: 1}},
			bson.D{{Key: "$lookup", Value: bson.D{
				{Key: "from", Value: "tags"},
				{Key: "let", Value: bson.D{{Key: "tagIds", Value: "$tagIds"}}},
				{Key: "pipeline",
					Value: bson.A{
						bson.D{
							{Key: "$match",
								Value: bson.D{
									{Key: "controlType", Value: "keyword"},
									{Key: "$expr",
										Value: bson.D{
											{Key: "$in",
												Value: bson.A{
													"$_id",
													"$$tagIds",
												},
											},
										},
									},
								},
							},
						},
						// bson.D{{Key: "$sort", Value: bson.D{{Key: "sortOder", Value: 1}}}},
						bson.D{
							{Key: "$group",
								Value: bson.D{
									{Key: "_id", Value: "$category"},
									{Key: "tags", Value: bson.D{{Key: "$push", Value: "$$ROOT"}}},
								},
							},
						},
					},
				},
				{Key: "as", Value: "keywordTags"},
			},
			},
			},
			bson.D{{Key: "$lookup", Value: bson.D{
				{Key: "from", Value: "tags"},
				{Key: "let", Value: bson.D{{Key: "tagIds", Value: "$tagIds"}}},
				{Key: "pipeline",
					Value: bson.A{
						bson.D{
							{Key: "$match",
								Value: bson.D{
									{Key: "controlType", Value: "meta"},
									{Key: "$expr",
										Value: bson.D{
											{Key: "$in",
												Value: bson.A{
													"$_id",
													"$$tagIds",
												},
											},
										},
									},
								},
							},
						},
						// bson.D{{Key: "$sort", Value: bson.D{{Key: "sortOder", Value: 1}}}},
						bson.D{
							{Key: "$group",
								Value: bson.D{
									{Key: "_id", Value: "$category"},
									{Key: "tags", Value: bson.D{{Key: "$push", Value: "$$ROOT"}}},
								},
							},
						},
					},
				},
				{Key: "as", Value: "metaTags"},
			},
			},
			},
			bson.D{
				{Key: "$lookup",
					Value: bson.D{
						{Key: "from", Value: "pvs"},
						{Key: "let", Value: bson.D{{Key: "movieId", Value: "$_id"}}},
						{Key: "pipeline",
							Value: bson.A{
								bson.D{
									{Key: "$match",
										Value: bson.D{
											{Key: "$expr",
												Value: bson.D{
													{Key: "$eq",
														Value: bson.A{
															"$movieId",
															"$$movieId",
														},
													},
												},
											},
										},
									},
								},
							},
						},
						{Key: "as", Value: "pvs"},
					},
				},
			},
			bson.D{
				{Key: "$lookup",
					Value: bson.D{
						{Key: "from", Value: "images"},
						{Key: "let", Value: bson.D{{Key: "movieId", Value: "$_id"}}},
						{Key: "pipeline",
							Value: bson.A{
								bson.D{
									{Key: "$match",
										Value: bson.D{
											{Key: "$expr",
												Value: bson.D{
													{Key: "$eq",
														Value: bson.A{
															"$movieId",
															"$$movieId",
														},
													},
												},
											},
										},
									},
								},
							},
						},
						{Key: "as", Value: "images"},
					},
				},
			},
			bson.D{
				{Key: "$lookup", Value: bson.D{
					{Key: "from", Value: "plannings"},
					{Key: "let", Value: bson.D{{Key: "movieId", Value: "$_id"}}},
					{Key: "pipeline",
						Value: bson.A{
							bson.D{
								{Key: "$match",
									Value: bson.D{
										{Key: "$expr",
											Value: bson.D{
												{Key: "$eq",
													Value: bson.A{
														"$movieId",
														"$$movieId",
													},
												},
											},
										},
									},
								},
							},
							bson.D{
								{Key: "$lookup",
									Value: bson.D{
										{Key: "from", Value: "sites"},
										{Key: "let", Value: bson.D{{Key: "siteId", Value: "$siteId"}}},
										{Key: "pipeline",
											Value: bson.A{
												bson.D{
													{Key: "$match",
														Value: bson.D{
															{Key: "$expr",
																Value: bson.D{
																	{Key: "$eq",
																		Value: bson.A{
																			"$_id",
																			"$$siteId",
																		},
																	},
																},
															},
														},
													},
												},
											},
										},
										{Key: "as", Value: "site"},
									},
								},
							},
							bson.D{{Key: "$unwind", Value: "$site"}},
						},
					},
					{Key: "as", Value: "plannings"},
				},
				},
			},
			bson.D{
				{Key: "$unset",
					Value: bson.A{
						"pvs._id",
						"pvs.movieId",
						"images._id",
						"images.movieId",
					},
				},
			},
			bson.D{
				{Key: "$project",
					Value: bson.D{
						{Key: "_id", Value: 1},
						{Key: "title", Value: 1},
						{Key: "contentType", Value: 1},
						{Key: "summary", Value: 1},
						{Key: "rates", Value: 1},
						{Key: "pvs", Value: 1},
						{Key: "images", Value: 1},
						{Key: "plannings", Value: 1},
						{Key: "keywordTags", Value: 1},
						{Key: "metaTags", Value: 1},
					},
				},
			},
		}

		cursor, err := movieCollection.Aggregate(ctx, pipeline)
		if err != nil {
			c.JSON(
				http.StatusInternalServerError,
				responses.ErrorResponse{
					Status:  http.StatusInternalServerError,
					Message: "pipeline does not work",
					Data:    map[string]interface{}{"data": err.Error()},
				},
			)
			return
		}

		movieRead := []MovieById{}
		if err = cursor.All(ctx, &movieRead); err != nil {
			c.JSON(
				http.StatusInternalServerError,
				responses.ErrorResponse{
					Status:  http.StatusInternalServerError,
					Message: "cursor does not work",
					Data:    map[string]interface{}{"data": err.Error()},
				},
			)
			return
		}

		if len(movieRead) == 0 {
			c.JSON(
				http.StatusNotFound,
				responses.ErrorResponse{
					Status:  http.StatusNotFound,
					Message: "NotFound",
					Data:    map[string]interface{}{"data": "no title"},
				},
			)
			return
		}

		c.JSON(
			http.StatusCreated,
			&movieRead[0],
		)
	}
}

func GetRecommendMovie() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		tagId := c.Param("tagId")

		// mongo id object check
		objId, err := primitive.ObjectIDFromHex(tagId)
		if err != nil {
			c.JSON(
				http.StatusBadRequest,
				responses.ErrorResponse{
					Status:  http.StatusBadRequest,
					Message: "tagId can't decoded",
					Data:    map[string]interface{}{"data": err.Error()},
				},
			)
			return
		}

		// var cursor *mongo.Cursor
		pipeline := bson.A{
			bson.D{{Key: "$match", Value: bson.D{{Key: "tagIds", Value: objId}}}},
			bson.D{{Key: "$limit", Value: 10}},
			bson.D{
				{Key: "$lookup",
					Value: bson.D{
						{Key: "from", Value: "tags"},
						{Key: "let", Value: bson.D{{Key: "tagIds", Value: "$tagIds"}}},
						{Key: "pipeline",
							Value: bson.A{
								bson.D{
									{Key: "$match",
										Value: bson.D{
											{Key: "$or",
												Value: bson.A{
													bson.D{{Key: "category", Value: "publicationDate"}},
													bson.D{{Key: "category", Value: "genre"}},
												},
											},
											{Key: "$expr",
												Value: bson.D{
													{Key: "$in",
														Value: bson.A{
															"$_id",
															"$$tagIds",
														},
													},
												},
											},
										},
									},
								},
								bson.D{{Key: "$sort", Value: bson.D{{Key: "sortOder", Value: 1}}}},
							},
						},
						{Key: "as", Value: "tags"},
					},
				},
			},
			bson.D{{Key: "$sort", Value: bson.D{{Key: "publicationDate", Value: 1}}}},
			bson.D{
				{Key: "$lookup",
					Value: bson.D{
						{Key: "from", Value: "images"},
						{Key: "let", Value: bson.D{{Key: "movieId", Value: "$_id"}}},
						{Key: "pipeline",
							Value: bson.A{
								bson.D{
									{Key: "$match",
										Value: bson.D{
											{Key: "isMain", Value: true},
											{Key: "$expr",
												Value: bson.D{
													{Key: "$eq",
														Value: bson.A{
															"$movieId",
															"$$movieId",
														},
													},
												},
											},
										},
									},
								},
							},
						},
						{Key: "as", Value: "image"},
					},
				},
			},
			bson.D{{Key: "$unwind", Value: bson.D{{Key: "path", Value: "$image"}}}},
			bson.D{
				{Key: "$unset",
					Value: bson.A{
						"summary",
						"tagIds",
					},
				},
			},
			bson.D{
				{Key: "$project",
					Value: bson.D{
						{Key: "_id", Value: 1},
						{Key: "title", Value: 1},
						{Key: "contentType", Value: 1},
						{Key: "publicationoDate", Value: 1},
						{Key: "rates", Value: 1},
						{Key: "tags", Value: 1},
						{Key: "pvs", Value: 1},
						{Key: "image", Value: 1},
					},
				},
			},
		}

		cursor, err := movieCollection.Aggregate(ctx, pipeline)
		if err != nil {
			c.JSON(
				http.StatusInternalServerError,
				responses.ErrorResponse{
					Status:  http.StatusInternalServerError,
					Message: "pipeline does not work",
					Data:    map[string]interface{}{"data": err.Error()},
				},
			)
			return
		}

		movieRead := []RecommendMovie{}
		// var results []bson.D
		if err = cursor.All(ctx, &movieRead); err != nil {
			c.JSON(
				http.StatusInternalServerError,
				responses.ErrorResponse{
					Status:  http.StatusInternalServerError,
					Message: "cursor does not work",
					Data:    map[string]interface{}{"data": err.Error()},
				},
			)
			return
		}
		// for _, result := range results {
		// 	fmt.Println(result)
		// }

		c.JSON(
			http.StatusCreated,
			&movieRead,
		)
	}
}

func GetRelatedMovies() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		tagId := c.Param("tagId")

		// mongo id object check
		objId, err := primitive.ObjectIDFromHex(tagId)
		if err != nil {
			c.JSON(
				http.StatusBadRequest,
				responses.ErrorResponse{
					Status:  http.StatusBadRequest,
					Message: "tagId can't decoded",
					Data:    map[string]interface{}{"data": err.Error()},
				},
			)
			return
		}

		// var cursor *mongo.Cursor
		pipeline := bson.A{
			bson.D{{Key: "$match", Value: bson.D{{Key: "tagIds", Value: objId}}}},
			bson.D{
				{Key: "$lookup",
					Value: bson.D{
						{Key: "from", Value: "reviews"},
						{Key: "let", Value: bson.D{{Key: "movieId", Value: "$_id"}}},
						{Key: "pipeline",
							Value: bson.A{
								bson.D{
									{Key: "$match",
										Value: bson.D{
											{Key: "$expr",
												Value: bson.D{
													{Key: "$eq",
														Value: bson.A{
															"$productId",
															"$$movieId",
														},
													},
												},
											},
										},
									},
								},
								bson.D{{Key: "$limit", Value: 1}},
							},
						},
						{Key: "as", Value: "review"},
					},
				},
			},
			bson.D{{Key: "$unwind", Value: bson.D{{Key: "path", Value: "$review"}}}},
			bson.D{
				{Key: "$lookup",
					Value: bson.D{
						{Key: "from", Value: "tags"},
						{Key: "let", Value: bson.D{{Key: "tagIds", Value: "$tagIds"}}},
						{Key: "pipeline",
							Value: bson.A{
								bson.D{
									{Key: "$match",
										Value: bson.D{
											{Key: "$or",
												Value: bson.A{
													bson.D{{Key: "category", Value: "publicationDate"}},
													bson.D{{Key: "category", Value: "genre"}},
													bson.D{{Key: "cateogry", Value: "thought"}},
													bson.D{{Key: "cateogry", Value: "action"}},
													bson.D{{Key: "cateogry", Value: "freeWord"}},
												},
											},
											{Key: "$expr",
												Value: bson.D{
													{Key: "$in",
														Value: bson.A{
															"$_id",
															"$$tagIds",
														},
													},
												},
											},
										},
									},
								},
							},
						},
						{Key: "as", Value: "tags"},
					},
				},
			},
			bson.D{
				{Key: "$lookup",
					Value: bson.D{
						{Key: "from", Value: "images"},
						{Key: "let", Value: bson.D{{Key: "movieId", Value: "$_id"}}},
						{Key: "pipeline",
							Value: bson.A{
								bson.D{
									{Key: "$match",
										Value: bson.D{
											{Key: "isMain", Value: true},
											{Key: "$expr",
												Value: bson.D{
													{Key: "$eq",
														Value: bson.A{
															"$movieId",
															"$$movieId",
														},
													},
												},
											},
										},
									},
								},
							},
						},
						{Key: "as", Value: "image"},
					},
				},
			},
			bson.D{{Key: "$unwind", Value: bson.D{{Key: "path", Value: "$image"}}}},
			bson.D{
				{Key: "$project",
					Value: bson.D{
						{Key: "_id", Value: 1},
						{Key: "title", Value: 1},
						{Key: "rates", Value: 1},
						{Key: "contentType", Value: 1},
						{Key: "ragIds", Value: 1},
						{Key: "publicationoDate", Value: 1},
						{Key: "review", Value: 1},
						{Key: "tags", Value: 1},
						{Key: "image", Value: 1},
					},
				},
			},
		}

		cursor, err := movieCollection.Aggregate(ctx, pipeline)
		if err != nil {
			c.JSON(
				http.StatusInternalServerError,
				responses.ErrorResponse{
					Status:  http.StatusInternalServerError,
					Message: "pipeline does not work",
					Data:    map[string]interface{}{"data": err.Error()},
				},
			)
			return
		}

		movieRead := []MovieWithReview{}
		// var results []bson.D
		if err = cursor.All(ctx, &movieRead); err != nil {
			c.JSON(
				http.StatusInternalServerError,
				responses.ErrorResponse{
					Status:  http.StatusInternalServerError,
					Message: "cursor does not work",
					Data:    map[string]interface{}{"data": err.Error()},
				},
			)
			return
		}
		// for _, result := range results {
		// 	fmt.Println(result)
		// }

		c.JSON(
			http.StatusCreated,
			&movieRead,
		)
	}
}

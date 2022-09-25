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
		for i := range movieRead.Tags {
			oid, err := primitive.ObjectIDFromHex(movieRead.Tags[i].Id)
			if err != nil {
				panic(err)
			}
			movieWrite.Tags = append(movieWrite.Tags, &WId{Id: oid})
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
			Tags:        movieWrite.Tags,
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
				{Key: "let", Value: bson.D{{Key: "tag_ids", Value: "$tag_ids"}}},
				{Key: "pipeline",
					Value: bson.A{
						bson.D{
							{Key: "$match",
								Value: bson.D{
									{Key: "$expr",
										Value: bson.D{
											{Key: "$in",
												Value: bson.A{
													"$_id",
													"$$tag_ids",
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
				{Key: "$unset",
					Value: bson.A{
						"tags._id",
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
						{Key: "tags", Value: 1},
						{Key: "pvs", Value: 1},
						{Key: "images", Value: 1},
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

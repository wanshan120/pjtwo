package movie

import (
	"context"
	"errors"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type MovieServicesImpl struct {
	ctx        context.Context
	collection *mongo.Collection
}

func NewMovieService(ctx context.Context, collection *mongo.Collection) MovieServices {
	return &MovieServicesImpl{ctx, collection}
}

func (msi *MovieServicesImpl) AddMovie(movie *AddMovieInput) (*DBResponse, error) {
	movie.CreatedAt = time.Now()
	movie.UpdatedAt = movie.CreatedAt

	ctx1, cancel := context.WithTimeout(msi.ctx, 2*time.Second)
	defer cancel()
	res, err := msi.collection.InsertOne(ctx1, &movie)
	if err != nil {
		if er, ok := err.(mongo.WriteException); ok && er.WriteErrors[0].Code == 1100 {
			return nil, errors.New("movie with that ID already exist")
		}
		return nil, err
	}

	// response
	var newMovie *DBResponse
	query := bson.M{"_id": res.InsertedID}
	err = msi.collection.FindOne(ctx1, query).Decode(&newMovie)
	if err != nil {
		return nil, err
	}

	return newMovie, nil
}

// 映画情報を取得する
func (msi *MovieServicesImpl) FindMovieById(id primitive.ObjectID) (*FindMovieDBResponse, error) {

	pipeline := bson.A{
		bson.D{{Key: "$match", Value: bson.D{{Key: "_id", Value: id}}}},
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

	cursor, err := msi.collection.Aggregate(msi.ctx, pipeline)
	if err != nil {
		return nil, err
	}

	movie := []FindMovieDBResponse{}
	if err = cursor.All(msi.ctx, &movie); err != nil {
		return nil, err
	}

	// no document check
	if len(movie) == 0 {
		return &FindMovieDBResponse{}, mongo.ErrNoDocuments
	}

	return &movie[0], nil
}

// おすすめの映画を探す
func (msi *MovieServicesImpl) FindRecommendedMovies(tagId primitive.ObjectID) (*[]RecomendDBResponse, error) {

	pipeline := bson.A{
		bson.D{{Key: "$match", Value: bson.D{{Key: "tagIds", Value: tagId}}}},
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

	cursor, err := msi.collection.Aggregate(msi.ctx, pipeline)
	if err != nil {
		return nil, err
	}

	movies := []RecomendDBResponse{}
	if err = cursor.All(msi.ctx, &movies); err != nil {
		return nil, err
	}

	return &movies, nil
}

// 関連映画を探す
func (msi *MovieServicesImpl) FindRelatedMovies(tagId primitive.ObjectID) (*[]RelatedMovieDBResponse, error) {

	pipeline := bson.A{
		bson.D{{Key: "$match", Value: bson.D{{Key: "tagIds", Value: tagId}}}},
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

	cursor, err := msi.collection.Aggregate(msi.ctx, pipeline)
	if err != nil {
		return nil, err
	}

	movies := []RelatedMovieDBResponse{}
	if err = cursor.All(msi.ctx, &movies); err != nil {
		return nil, err
	}

	return &movies, nil
}

package rate

import (
	"context"

	"github.com/wanshan120/pjtwo/go_backend/common/pjtwodb/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type RateServicesImpl struct {
	ctx        context.Context
	collection *mongo.Collection
}

func NewRateServices(ctx context.Context, collection *mongo.Collection) RateServices {
	return &RateServicesImpl{ctx, collection}
}

func (rsi *RateServicesImpl) FindRatings(id primitive.ObjectID) (*[]models.RatingCountResponse, error) {

	pipeline := bson.A{
		bson.D{{Key: "$match", Value: bson.D{{Key: "productId", Value: id}}}},
		bson.D{
			{Key: "$group", Value: bson.D{
				{Key: "_id", Value: "$rateValue"},
				{Key: "count", Value: bson.D{{Key: "$sum", Value: 1}}},
			},
			},
		},
	}

	cursor, err := rsi.collection.Aggregate(rsi.ctx, pipeline)
	if err != nil {
		return nil, err
	}

	results := []models.RatingCountResponse{}
	if err = cursor.All(rsi.ctx, &results); err != nil {
		return nil, err
	}

	return &results, nil
}

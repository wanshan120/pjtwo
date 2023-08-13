package rate

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type RateServices interface {
	FindRatings(primitive.ObjectID) (*[]RatingCountResponse, error)
}

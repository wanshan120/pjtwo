package rate

import (
	"github.com/wanshan120/pjtwo/go_backend/common/pjtwodb/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type RateServices interface {
	FindRatings(primitive.ObjectID) (*[]models.RatingCountResponse, error)
}

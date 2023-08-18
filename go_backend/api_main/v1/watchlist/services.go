package watchlist

import (
	"github.com/wanshan120/pjtwo/go_backend/common/pjtwodb/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type WatchlistServices interface {
	Add(primitive.ObjectID, primitive.ObjectID) (*models.Watchlist, error)
	Delete(primitive.ObjectID, primitive.ObjectID) error
	FindOne(primitive.ObjectID, primitive.ObjectID) (*models.Watchlist, error)
}

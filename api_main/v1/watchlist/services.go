package watchlist

import "go.mongodb.org/mongo-driver/bson/primitive"

type WatchlistServices interface {
	Add(primitive.ObjectID, primitive.ObjectID) (*WatchlistSchema, error)
	Delete(primitive.ObjectID, primitive.ObjectID) error
	FindOne(primitive.ObjectID, primitive.ObjectID) (*WatchlistSchema, error)
}

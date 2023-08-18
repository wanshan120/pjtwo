package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Watchlist struct {
	Id        primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	ProductId primitive.ObjectID `json:"productId" bson:"productId,omitempty"`
	UserId    primitive.ObjectID `json:"userId" bson:"userId,omitempty"`
	CreatedAt time.Time          `json:"createdAt" bson:"createdAt"`
}

type AddWatchlist struct {
	ProductId primitive.ObjectID `json:"productId" bson:"productId,omitempty"`
	UserId    primitive.ObjectID `json:"userId" bson:"userId,omitempty"`
	CreatedAt time.Time          `json:"createdAt" bson:"createdAt"`
}

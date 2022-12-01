package rate

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Ratings struct {
	Id        primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	ProductId primitive.ObjectID `json:"productId" bson:"productId,omitempty"`
	UserId    primitive.ObjectID `json:"userId" bson:"userId,omitempty"`
	RateValue float64            `json:"rateValue" bson:"rateValue,omitempty"`
}

type RatingsJson struct {
	Id        string  `json:"id" bson:"_id,omitempty"`
	ProductId string  `json:"productId" bson:"productId,omitempty"`
	UserId    string  `json:"userId" bson:"userId,omitempty"`
	RateValue float64 `json:"rateValue" bson:"rateValue,omitempty"`
}

type RatingsGroupJson struct {
	Id        string  `json:"id" bson:"_id,omitempty"`
	ProductId string  `json:"productId" bson:"productId,omitempty"`
	UserId    string  `json:"userId" bson:"userId,omitempty"`
	RateValue float64 `json:"rateValue" bson:"rateValue,omitempty"`
}

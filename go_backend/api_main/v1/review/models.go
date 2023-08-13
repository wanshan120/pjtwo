package review

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ReviewJson struct {
	Id        primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	UserId    primitive.ObjectID `json:"userId" bson:"userId,omitempty" binding:"required"`
	ProductId primitive.ObjectID `json:"productId" bson:"productId,omitempty" binding:"required"`
	Title     string             `json:"title" bson:"title,omitempty"`
	Content   string             `json:"content" bson:"content,omitempty"`
	UpdatedAt primitive.DateTime `json:"updatedAt" bson:"updatedAt,omitempty"`
}

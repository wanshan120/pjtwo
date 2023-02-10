package movie

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// ? AddMovieInput struct
type AddMovieInput struct {
	Id          primitive.ObjectID `bson:"_id,omitempty"`
	Title       string             `bson:"title,omitempty" binding:"required"`
	ContentType string             `bson:"contentType,omitempty" binding:"required"`
	Rates       []*Rate            `bson:"rates,omitempty"`
	Images      []*Image           `bson:"images,omitempty"`
	Pvs         []*Pv              `bson:"pvs,omitempty"`
	Plannings   []*Planning        `bson:"plannings,omitempty"`
	Summary     string             `bson:"summary,omitempty"`
	TagIds      []string           `bson:"tagIds,omitempty" binding:"dive"`
	CreatedAt   time.Time          `json:"createdAt" bson:"createdAt"`
	UpdatedAt   time.Time          `json:"updatedAt" bson:"updatedAt"`
}

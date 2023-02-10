package movie

import (
	"api_main/v1/review"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type DBResponse struct {
	Id          primitive.ObjectID   `json:"id" bson:"_id,omitempty"`
	Title       string               `json:"title" bson:"title,omitempty" validate:"required"`
	ContentType string               `json:"contentType" bson:"contentType,omitempty" validate:"required"`
	Rates       []*Rate              `json:"rates" bson:"rates,omitempty"`
	Images      []*Image             `json:"images" bson:"images,omitempty"`
	Pvs         []*Pv                `json:"pvs" bson:"pvs,omitempty"`
	Summary     string               `json:"summary" bson:"summary,omitempty"`
	TagIds      []primitive.ObjectID `json:"tagIds" bson:"tagIds,omitempty" binding:"dive"`
	Plannings   []*Planning          `json:"plannings" bson:"plannings,omitempty" binding:"dive"`
}

func FilteredResponse(movie *DBResponse) DBResponse {
	return DBResponse{
		Id:          primitive.NewObjectID(),
		Title:       movie.Title,
		ContentType: movie.ContentType,
		Rates:       movie.Rates,
		Images:      movie.Images,
		Pvs:         movie.Pvs,
		Summary:     movie.Summary,
		TagIds:      movie.TagIds,
		Plannings:   movie.Plannings,
	}
}

type FindMovieDBResponse struct {
	Id          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Title       string             `json:"title" bson:"title,omitempty" validate:"required"`
	ContentType string             `json:"contentType" bson:"contentType,omitempty" validate:"required"`
	Rates       []*Rate            `json:"rates" bson:"rates,omitempty"`
	Images      []*Image           `json:"images" bson:"images,omitempty"`
	Pvs         []*Pv              `json:"pvs" bson:"pvs,omitempty"`
	Summary     string             `json:"summary" bson:"summary,omitempty"`
	KeywordTags []*Category        `json:"keywordTags" bson:"keywordTags,omitempty" binding:"dive"`
	MetaTags    []*Category        `json:"metaTags" bson:"metaTags,omitempty" binding:"dive"`
	Plannings   []*Planning        `json:"plannings" bson:"plannings,omitempty" binding:"dive"`
}

type RecomendDBResponse struct {
	Id               primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Title            string             `json:"title" bson:"title,omitempty" validate:"required"`
	ContentType      string             `json:"contentType" bson:"contentType,omitempty" validate:"required"`
	Rates            []*Rate            `json:"rates" bson:"rates,omitempty"`
	Image            Image              `json:"image" bson:"image,omitempty"`
	Tags             []*Tag             `json:"tags" bson:"tags,omitempty" binding:"dive"`
	PublicationoDate primitive.DateTime `json:"publicationDate" bson:"publicationDate,omitempty"`
}

type RelatedMovieDBResponse struct {
	Id               primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Title            string             `json:"title" bson:"title,omitempty" validate:"required"`
	ContentType      string             `json:"contentType" bson:"contentType,omitempty" validate:"required"`
	Rates            []*Rate            `json:"rates" bson:"rates,omitempty"`
	Image            Image              `json:"image" bson:"image,omitempty"`
	Tags             []*Tag             `json:"tags" bson:"tags,omitempty" binding:"dive"`
	Review           review.ReviewJson  `json:"review" bson:"review,omitempty" binding:"dive"`
	PublicationoDate primitive.DateTime `json:"publicationDate" bson:"publicationDate,omitempty"`
}

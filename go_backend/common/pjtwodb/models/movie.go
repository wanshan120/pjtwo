package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Movie struct {
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

func FiltereMovie(movie *Movie) Movie {
	return Movie{
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

// Rate represents a rating for a movie from a specific service.
type Rate struct {
	ServiceName string  `json:"serviceName" bson:"serviceName,omitempty"`
	RateValue   float64 `json:"rateValue" bson:"rateValue,omitempty"`
}

// Pv represents a promotional video for a movie.
type Pv struct {
	ServiceName string             `json:"serviceName" bson:"serviceName,omitempty"`
	Url         string             `json:"url" bson:"url,omitempty"`
	IsMain      bool               `json:"isMain" bson:"isMain,omitempty"`
	UpdatedAt   primitive.DateTime `json:"updatedAt" bson:"updatedAt,omitempty"`
}

// Image represents an image associated with a movie.
type Image struct {
	Title     string             `json:"title" bson:"title,omitempty"`
	Path      string             `json:"path" bson:"path,omitempty"`
	Desc      string             `json:"desc" bson:"desc,omitempty"`
	IsMain    bool               `json:"isMain" bson:"isMain,omitempty"`
	UpdatedAt primitive.DateTime `json:"updatedAt" bson:"updatedAt,omitempty"`
}

// Tag represents a categorization tag for a movie.
type Tag struct {
	Id          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name        string             `json:"name" bson:"name,omitempty" validate:"required"`
	Category    string             `json:"category" bson:"category,omitempty" validate:"required"`
	ControlType string             `json:"controlType" bson:"controlType,omitempty" validate:"required"`
	Status      string             `json:"status" bson:"status,omitempty" validate:"required"`
	Desc        string             `json:"desc" bson:"desc,omitempty"`
}

// StreamingSite represents the details of a streaming site where the movie can be watched.
type Site struct {
	Name string `json:"name" bson:"name,omitempty"`
	Icon string `json:"icon" bson:"icon,omitempty"`
}

// Planning represents the details of a streaming plan for a movie on a specific site.
type Planning struct {
	Site           Site               `json:"site" bson:"site,omitempty" validate:"required"`
	Url            string             `json:"url" bson:"url,omitempty" validate:"required"`
	IsFree         bool               `json:"isFree" bson:"isFree,omitempty"`
	IsRental       bool               `json:"isRental" bson:"isRental,omitempty"`
	IsSubscription bool               `json:"isSubscription" bson:"isSubscription,omitempty"`
	IsBuy          bool               `json:"isBuy" bson:"isBuy,omitempty"`
	Price          int32              `json:"price" bson:"price,omitempty" validate:"required"`
	UpdatedAt      primitive.DateTime `json:"updatedAt" bson:"updatedAt,omitempty"`
}

// Category represents a group of related tags that are treated as a single category.
type Category struct {
	Id   string `json:"id" bson:"_id,omitempty" binding:"dive"`
	Tags []*Tag `json:"tags" bson:"tags,omitempty" binding:"dive"`
}

type FindMovieDetail struct {
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

type RecommendedMovie struct {
	Id               primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Title            string             `json:"title" bson:"title,omitempty" validate:"required"`
	ContentType      string             `json:"contentType" bson:"contentType,omitempty" validate:"required"`
	Rates            []*Rate            `json:"rates" bson:"rates,omitempty"`
	Image            Image              `json:"image" bson:"image,omitempty"`
	Tags             []*Tag             `json:"tags" bson:"tags,omitempty" binding:"dive"`
	PublicationoDate primitive.DateTime `json:"publicationDate" bson:"publicationDate,omitempty"`
}

type RelatedMovie struct {
	Id               primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Title            string             `json:"title" bson:"title,omitempty" validate:"required"`
	ContentType      string             `json:"contentType" bson:"contentType,omitempty" validate:"required"`
	Rates            []*Rate            `json:"rates" bson:"rates,omitempty"`
	Image            Image              `json:"image" bson:"image,omitempty"`
	Tags             []*Tag             `json:"tags" bson:"tags,omitempty" binding:"dive"`
	Review           ReviewJson         `json:"review" bson:"review,omitempty" binding:"dive"`
	PublicationoDate primitive.DateTime `json:"publicationDate" bson:"publicationDate,omitempty"`
}

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

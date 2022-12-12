package movie

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type RId struct {
	Id string `json:"_id" bson:"_id,omitempty" binding:"required"`
}

type WId struct {
	Id primitive.ObjectID `json:"_id" bson:"_id,omitempty" binding:"required"`
}

type Movie struct {
	Id          primitive.ObjectID `bson:"_id,omitempty"`
	Title       string             `bson:"title,omitempty" binding:"required"`
	ContentType string             `bson:"contentType,omitempty" binding:"required"`
	Rates       []*Rate            `bson:"rates,omitempty"`
	Images      []*Image           `bson:"images,omitempty"`
	Pvs         []*Pv              `bson:"pvs,omitempty"`
	Plannings   []*Planning        `bson:"plannings,omitempty"`
	Summary     string             `bson:"summary,omitempty"`
	TagIds      []string           `bson:"tagIds,omitempty" binding:"dive"`
	// EditLogs primitive.DateTime    `bson:"edit_logs,omitempty"`
}

type MovieWrite struct {
	Id          primitive.ObjectID   `bson:"_id,omitempty"`
	Title       string               `bson:"title,omitempty" validate:"required"`
	ContentType string               `bson:"contentType,omitempty" validate:"required"`
	Rates       []*Rate              `bson:"rates,omitempty"`
	Images      []*Image             `bson:"images,omitempty"`
	Pvs         []*Pv                `bson:"pvs,omitempty"`
	Summary     string               `bson:"summary,omitempty"`
	TagIds      []primitive.ObjectID `bson:"tagIds,omitempty" binding:"dive"`
	Plannings   []*Planning          `bson:"plannings,omitempty" binding:"dive"`
	// EditLogs primitive.DateTime    `bson:"edit_logs,omitempty"`
}

type MovieById struct {
	Id          primitive.ObjectID `bson:"_id,omitempty"`
	Title       string             `bson:"title,omitempty" validate:"required"`
	ContentType string             `bson:"contentType,omitempty" validate:"required"`
	Rates       []*Rate            `bson:"rates,omitempty"`
	Images      []*Image           `bson:"images,omitempty"`
	Pvs         []*Pv              `bson:"pvs,omitempty"`
	Summary     string             `bson:"summary,omitempty"`
	KeywordTags []*Category        `bson:"keywordTags,omitempty" binding:"dive"`
	MetaTags    []*Category        `bson:"metaTags,omitempty" binding:"dive"`
	Plannings   []*Planning        `bson:"plannings,omitempty" binding:"dive"`

	// EditLogs primitive.DateTime    `bson:"edit_logs,omitempty"`
}

type RecommendMovie struct {
	Id               primitive.ObjectID `bson:"_id,omitempty"`
	Title            string             `bson:"title,omitempty" validate:"required"`
	ContentType      string             `bson:"contentType,omitempty" validate:"required"`
	Rates            []*Rate            `bson:"rates,omitempty"`
	Image            Image              `bson:"image,omitempty"`
	Tags             []*Tag             `bson:"tags,omitempty" binding:"dive"`
	PublicationoDate primitive.DateTime `json:"publicationDate" bson:"publicationDate,omitempty"`
}

type Rate struct {
	ServiceName string  `json:"serviceName" bson:"serviceName,omitempty"`
	RateValue   float64 `json:"rateValue" bson:"rateValue,omitempty"`
}

type Pv struct {
	ServiceName string             `json:"serviceName" bson:"serviceName,omitempty"`
	Url         string             `json:"url" bson:"url,omitempty"`
	IsMain      bool               `json:"isMain" bson:"isMain,omitempty"`
	UpdatedAt   primitive.DateTime `json:"updatedAt" bson:"updatedAt,omitempty"`
}

type Image struct {
	Title     string             `json:"title" bson:"title,omitempty"`
	Path      string             `json:"path" bson:"path,omitempty"`
	Desc      string             `json:"desc" bson:"desc,omitempty"`
	IsMain    bool               `json:"isMain" bson:"isMain,omitempty"`
	UpdatedAt primitive.DateTime `json:"updatedAt" bson:"updatedAt,omitempty"`
}

// type Summary struct {
// 	UserId    primitive.ObjectID `bson:"user_id,omitempty" validate:required`
// 	ServiceName string `bson:"service_name,omitempty"`
// 	Desc        string `bson:"desc,omitempty"`
// 	CreatedAt primitive.DateTime `bson:"created_at,omitempty"`
// }

// type EditLog struct {
// 	UserId     primitive.ObjectID `bson:"user_id,omitempty" validate:required`
// 	DescBefore string             `bson:"desc_before" validate:required`
// 	DescAfter  string             `bson:"desc_after" validate:required`
// 	CreatedAt  primitive.DateTime `bson:"created_at,omitempty"`
// }

type Tag struct {
	Id          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name        string             `json:"name" bson:"name,omitempty" validate:"required"`
	Category    string             `json:"category" bson:"category,omitempty" validate:"required"`
	ControlType string             `json:"controlType" bson:"controlType,omitempty" validate:"required"`
	Status      string             `json:"status" bson:"status,omitempty" validate:"required"`
	Desc        string             `json:"desc" bson:"desc,omitempty"`
}

type Site struct {
	Name string `json:"name" bson:"name,omitempty"`
	Icon string `json:"icon" bson:"icon,omitempty"`
}

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

type Category struct {
	Id   string `json:"id" bson:"_id,omitempty" binding:"dive"`
	Tags []*Tag `json:"tags" bson:"tags,omitempty" binding:"dive"`
}

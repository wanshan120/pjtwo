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
	Tags        []*Tag             `bson:"tags,omitempty" binding:"dive"`
	// EditLogs primitive.DateTime    `bson:"edit_logs,omitempty"`
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
	// Id       primitive.ObjectID `bson:"_id,omitempty"`
	Name     string `json:"name" bson:"name,omitempty" validate:"required"`
	Category string `json:"category" bson:"category,omitempty" validate:"required"`
	Type     string `json:"type" bson:"type,omitempty" validate:"required"`
	Status   string `json:"status" bson:"status,omitempty" validate:"required"`
	Desc     string `json:"desc" bson:"desc,omitempty"`
}

package movie

import "go.mongodb.org/mongo-driver/bson/primitive"

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
	Tags        []*RId             `bson:"tags,omitempty" binding:"dive"`
	// EditLogs primitive.DateTime    `bson:"edit_logs,omitempty"`
}

type MovieWrite struct {
	Id          primitive.ObjectID `bson:"_id,omitempty"`
	Title       string             `bson:"title,omitempty" validate:"required"`
	ContentType string             `bson:"contentType,omitempty" validate:"required"`
	Rates       []*Rate            `bson:"rates,omitempty"`
	Images      []*Image           `bson:"images,omitempty"`
	Pvs         []*Pv              `bson:"pvs,omitempty"`
	Summary     string             `bson:"summary,omitempty"`
	Tags        []*WId             `bson:"tags,omitempty" binding:"dive"`
	// EditLogs primitive.DateTime    `bson:"edit_logs,omitempty"`
}

type Rate struct {
	ServiceName string `bson:"serviceName,omitempty"`
	RateValue   int8   `bson:"rateValue,omitempty"`
}

type Pv struct {
	// UserId      primitive.ObjectID `bson:"user_id,omitempty" validate:required`
	ServiceName string `bson:"serviceName,omitempty"`
	RateValue   int8   `bson:"rateValue,omitempty"`
	// CreatedAt   primitive.DateTime `bson:"created_at,omitempty"`
}

type Image struct {
	// UserId    primitive.ObjectID `bson:"user_id,omitempty" validate:required`
	Title string `bson:"title,omitempty"`
	Path  string `bson:"path,omitempty"`
	Desc  string `bson:"desc,omitempty"`
	// CreatedAt primitive.DateTime `bson:"created_at,omitempty"`
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

// type Tag struct {
// 	Id primitive.ObjectID `bson:"_id,omitempty"`
// 	Name string `bson:"name,omitempty" validate:"required"`
// 	Category string `bson:"category,omitempty" validate:"required"`
// 	Type string `bson:"type,omitempty" validate:"required"`
// 	Status string `bson:"status,omitempty" validate:"required"`
// 	Desc string `bson:"desc,omitempty"`
// }

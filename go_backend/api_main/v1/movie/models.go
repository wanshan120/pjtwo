package movie

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

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

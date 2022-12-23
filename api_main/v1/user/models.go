package user

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	// Id        primitive.ObjectID `bson:"_id,omitempty"`
	Name      string             `bson:"name,omitempty" binding:"required"`
	UserName  string             `json:"userName" bson:"userName,omitempty" binding:"required"`
	Email     string             `bson:"email,omitempty" binding:"required"`
	Password  string             `bson:"password,omitempty" binding:"required"`
	UpdatedAt primitive.DateTime `json:"updatedAt" bson:"updatedAt,omitempty"`
}

type UserSchema struct {
	Id primitive.ObjectID `bson:"_id,omitempty"`
	User
}

func (user *User) HashPassword(password string) error {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		return err
	}
	user.Password = string(bytes)
	return nil
}

func (user *User) CheckPassword(providedPassword string) error {
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(providedPassword))
	if err != nil {
		return err
	}
	return nil
}

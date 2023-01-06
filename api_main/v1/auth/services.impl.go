package auth

import (
	usr "api_main/v1/user"
	"api_main/v1/utils"
	"context"
	"errors"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type AuthServicesImpl struct {
	ctx        context.Context
	collection *mongo.Collection
}

func NewAuthService(ctx context.Context, collection *mongo.Collection) AuthServices {
	return &AuthServicesImpl{ctx, collection}
}

func (uc *AuthServicesImpl) SignUpUser(user *usr.SignUpInput) (*usr.DBResponse, error) {
	user.CreatedAt = time.Now()
	user.UpdatedAt = user.CreatedAt
	user.Email = strings.ToLower(user.Email)
	user.PasswordConfirm = ""
	user.Verified = true
	user.Role = "user"

	hashedPassword, _ := utils.HashPassword(user.Password)
	user.Password = hashedPassword
	ctx1, cancel := context.WithTimeout(uc.ctx, 2*time.Second)
	defer cancel()
	res, err := uc.collection.InsertOne(ctx1, &user)

	if err != nil {
		if er, ok := err.(mongo.WriteException); ok && er.WriteErrors[0].Code == 11000 {
			return nil, errors.New("user with that email already exist")
		}
		return nil, err
	}

	// Create a unique index for the email field
	opt := options.Index()
	opt.SetUnique(true)
	index := mongo.IndexModel{Keys: bson.M{"email": 1}, Options: opt}

	if _, err := uc.collection.Indexes().CreateOne(ctx1, index); err != nil {
		return nil, errors.New("could not create index for email")
	}

	var newUser *usr.DBResponse
	query := bson.M{"_id": res.InsertedID}

	err = uc.collection.FindOne(ctx1, query).Decode(&newUser)
	if err != nil {
		return nil, err
	}

	return newUser, nil
}

func (uc *AuthServicesImpl) SignInUser(*usr.SignInInput) (*usr.DBResponse, error) {
	return nil, nil
}

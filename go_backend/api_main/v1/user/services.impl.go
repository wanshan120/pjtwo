package user

import (
	"context"
	"strings"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserServicesImpl struct {
	collection *mongo.Collection
	ctx        context.Context
}

func NewUserServiceImpl(ctx context.Context, collection *mongo.Collection) UserServices {
	return &UserServicesImpl{collection, ctx}
}

func (us *UserServicesImpl) FindUserById(id string) (*DBResponse, error) {
	oid, _ := primitive.ObjectIDFromHex(id)

	var user *DBResponse

	query := bson.M{"_id": oid}
	err := us.collection.FindOne(us.ctx, query).Decode(&user)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return &DBResponse{}, err
		}
		return nil, err
	}

	return user, nil
}

func (us *UserServicesImpl) FindUserByEmail(email string) (*DBResponse, error) {
	var user *DBResponse

	query := bson.M{"email": strings.ToLower(email)}
	err := us.collection.FindOne(us.ctx, query).Decode(&user)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return &DBResponse{}, err
		}
		return nil, err
	}

	return user, nil
}

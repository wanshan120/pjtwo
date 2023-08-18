package user

import (
	"context"
	"strings"

	"github.com/wanshan120/pjtwo/go_backend/common/pjtwodb/models"
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

func (us *UserServicesImpl) FindUserById(id string) (*models.UserRecord, error) {
	oid, _ := primitive.ObjectIDFromHex(id)

	var user *models.UserRecord

	query := bson.M{"_id": oid}
	err := us.collection.FindOne(us.ctx, query).Decode(&user)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return &models.UserRecord{}, err
		}
		return nil, err
	}

	return user, nil
}

func (us *UserServicesImpl) FindUserByEmail(email string) (*models.UserRecord, error) {
	var user *models.UserRecord

	query := bson.M{"email": strings.ToLower(email)}
	err := us.collection.FindOne(us.ctx, query).Decode(&user)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return &models.UserRecord{}, err
		}
		return nil, err
	}

	return user, nil
}

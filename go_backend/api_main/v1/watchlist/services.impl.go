package watchlist

import (
	"context"
	"errors"
	"time"

	"github.com/wanshan120/pjtwo/go_backend/common/pjtwodb/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type WatchlistServicesImpl struct {
	ctx        context.Context
	collection *mongo.Collection
}

func NewWatchlistService(ctx context.Context, collection *mongo.Collection) WatchlistServices {
	return &WatchlistServicesImpl{ctx, collection}
}

func (wsi *WatchlistServicesImpl) Add(productId primitive.ObjectID, userId primitive.ObjectID) (*models.Watchlist, error) {
	// insert
	watchlist := models.AddWatchlist{}
	watchlist.CreatedAt = time.Now()
	watchlist.UserId = userId
	watchlist.ProductId = productId

	res, err := wsi.collection.InsertOne(wsi.ctx, watchlist)
	if err != nil {
		if er, ok := err.(mongo.WriteException); ok && er.WriteErrors[0].Code == 1100 {
			return nil, errors.New("post with that productId already exists")
		}
		return nil, err
	}

	// index to productId
	opt := options.Index()
	opt.SetUnique(true)

	index := mongo.IndexModel{Keys: bson.M{"productId": 1}, Options: opt}

	if _, err := wsi.collection.Indexes().CreateOne(wsi.ctx, index); err != nil {
		return nil, errors.New("could not create index for productId")
	}

	// insert check
	newWached := models.Watchlist{}
	query := bson.M{"_id": res.InsertedID}
	if err := wsi.collection.FindOne(wsi.ctx, query).Decode(&newWached); err != nil {
		return nil, err
	}

	return &newWached, nil
}

func (wsi *WatchlistServicesImpl) Delete(productId primitive.ObjectID, userId primitive.ObjectID) error {
	query := bson.M{"productId": productId, "userId": userId}

	res, err := wsi.collection.DeleteOne(wsi.ctx, query)
	if err != nil {
		return err
	}

	if res.DeletedCount == 0 {
		return errors.New("no document with that Id exists")
	}

	return nil
}

func (wsi *WatchlistServicesImpl) FindOne(productId primitive.ObjectID, userId primitive.ObjectID) (*models.Watchlist, error) {

	// insert check
	newWached := models.Watchlist{}
	query := bson.M{"productId": productId, "userId": userId}
	if err := wsi.collection.FindOne(wsi.ctx, query).Decode(&newWached); err != nil {
		return nil, err
	}

	return &newWached, nil
}

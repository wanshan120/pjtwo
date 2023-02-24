package rate

import (
	"api_main/configs"
	"context"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

// RegisterRouter
func RegisterRouter(ctx context.Context, client *mongo.Client, r *gin.RouterGroup) {
	// movie
	collection := configs.GetCollection(client, "ratings")
	rs := NewRateServices(ctx, collection)
	rc := NewRateController(rs)

	r.GET("/:productId", rc.FindRatings)

}

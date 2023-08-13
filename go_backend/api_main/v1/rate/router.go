package rate

import (
	"context"

	"github.com/wanshan120/pjtwo/go_backend/api_main/configs"

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

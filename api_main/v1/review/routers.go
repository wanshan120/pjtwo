package review

import (
	"api_main/configs"
	"context"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

// RegisterRouter
func RegisterRouter(ctx context.Context, client *mongo.Client, r *gin.RouterGroup) {
	collection := configs.GetCollection(client, "reviews")
	r.GET("/:productId", GetReviewByProductId(ctx, collection))

}

package movie

import (
	"api_main/configs"
	"context"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

// RegisterRouter
func RegisterRouter(ctx context.Context, client *mongo.Client, r *gin.RouterGroup) {
	collection := configs.GetCollection(client, "movies")

	r.POST("/", CreateMovieItem(ctx, collection))
	// 映画詳細ページ
	r.GET("/:movieId", GetMovieById(ctx, collection))
	r.GET("/recommend/:tagId", GetRecommendMovie(ctx, collection))
	r.GET("/related/:tagId", GetRelatedMovies(ctx, collection))
}

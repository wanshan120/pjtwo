package movie

import (
	"api_main/configs"
	"context"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

// RegisterRouter
func RegisterRouter(ctx context.Context, client *mongo.Client, r *gin.RouterGroup) {
	// user
	// usrCollection := configs.GetCollection(client, "users")
	// us := usr.NewUserServiceImpl(ctx, usrCollection)

	// movie
	collection := configs.GetCollection(client, "movies")
	ms := NewMovieService(ctx, collection)
	mc := NewMovieController(ms)

	r.POST("/", mc.AddMovie)
	// 映画詳細ページ
	// r.GET("/:movieId", middlewares.DeserializeUser(us), mc.FindMovieById)
	r.GET("/:movieId", mc.FindMovieById)
	r.GET("/recommend/:tagId", mc.FindRecommendedMovies)
	r.GET("/related/:tagId", mc.FindRelatedMovies)
	// r.GET("/:movieId", middlewares.DeserializeUser(us), GetMovieById(ctx, collection))
	// r.GET("/recommend/:tagId", GetRecommendMovie(ctx, collection))
	// r.GET("/related/:tagId", GetRelatedMovies(ctx, collection))
}

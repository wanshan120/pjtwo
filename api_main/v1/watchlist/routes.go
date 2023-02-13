package watchlist

import (
	"api_main/configs"
	"api_main/middlewares"
	usr "api_main/v1/user"
	"context"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

// RegisterRouter
func RegisterRouter(ctx context.Context, client *mongo.Client, r *gin.RouterGroup) {
	// user
	usrCollection := configs.GetCollection(client, "users")
	us := usr.NewUserServiceImpl(ctx, usrCollection)

	// watchlist
	collection := configs.GetCollection(client, "watchlist")
	ws := NewWatchlistService(ctx, collection)
	wc := NewWatchlistController(ws)

	// 追加
	r.POST("/:movieId", middlewares.DeserializeUser(us), wc.Add)
	// 削除
	r.DELETE("/:movieId", middlewares.DeserializeUser(us), wc.Delete)
	// 取得
	r.GET("/:movieId", middlewares.DeserializeUser(us), wc.FindOne)
}

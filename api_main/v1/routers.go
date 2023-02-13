package routers

import (
	"api_main/configs"
	"api_main/middlewares"
	"api_main/v1/auth"
	"api_main/v1/movie"
	"api_main/v1/rate"
	"api_main/v1/review"
	usr "api_main/v1/user"
	"api_main/v1/watchlist"
	"context"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// InitRouter ルートの初期化
func InitRouter() *gin.Engine {
	ctx := context.Background()

	router := gin.Default()

	setUpConfig(router)
	setUpRouter(ctx, router)

	return router
}

// アプリケーション設定の初期化
func setUpConfig(router *gin.Engine) {
	// CORS
	router.Use(cors.New(cors.Config{
		// アクセスを許可したいアクセス元
		AllowOrigins: []string{
			`http://localhost:3000`,
			`http://localhost:3001`,
		},
		// アクセスを許可したいHTTPメソッド(以下の例だとPUTやDELETEはアクセスできません)
		AllowMethods: []string{
			"POST",
			"GET",
			"PUT",
			"DELETE",
			"PATCH",
		},
		// 許可したいHTTPリクエストヘッダ
		AllowHeaders: []string{
			"Access-Control-Allow-Credentials",
			"Access-Control-Allow-Headers",
			"Content-Type",
			"Content-Length",
			"Accept-Encoding",
			"Authorization",
		},
		// cookieなどの情報を必要とするかどうか
		AllowCredentials: true,
		// preflightリクエストの結果をキャッシュする時間
		MaxAge: 24 * time.Hour,
	}))
	// redis session
}

// ルーティングの設定
func setUpRouter(ctx context.Context, router *gin.Engine) {
	// mongoDB
	client := configs.ConnectDB(ctx)

	v1 := router.Group("/api/v1")
	{
		movie.RegisterRouter(ctx, client, v1.Group("/movie"))
		rate.RegisterRouter(ctx, client, v1.Group("/rate"))
		review.RegisterRouter(ctx, client, v1.Group("/review"))
		watchlist.RegisterRouter(ctx, client, v1.Group("/watchlist"))
		{
			// userのみmiddlewareと循環参照するためuser packageはここでルート設定
			collection := configs.GetCollection(client, "users")
			users := v1.Group("/users").Use(middlewares.DeserializeUser(
				usr.NewUserServiceImpl(ctx, collection),
			))
			users.GET("/me", usr.GetMe)
		}
		auth.AuthRoute(ctx, client, v1.Group("/auth"))
	}
}

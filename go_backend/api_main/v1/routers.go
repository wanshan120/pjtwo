package routers

import (
	"context"
	"time"

	"github.com/wanshan120/pjtwo/go_backend/api_main/configs"
	"github.com/wanshan120/pjtwo/go_backend/api_main/middlewares"
	"github.com/wanshan120/pjtwo/go_backend/api_main/v1/auth"
	"github.com/wanshan120/pjtwo/go_backend/api_main/v1/movie"
	"github.com/wanshan120/pjtwo/go_backend/api_main/v1/rate"
	"github.com/wanshan120/pjtwo/go_backend/api_main/v1/review"
	usr "github.com/wanshan120/pjtwo/go_backend/api_main/v1/user"
	"github.com/wanshan120/pjtwo/go_backend/api_main/v1/watchlist"

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

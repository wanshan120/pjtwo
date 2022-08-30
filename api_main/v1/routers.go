package routers

import (
	"api_main/v1/movie"

	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// InitRouter ルートの初期化
func InitRouter() *gin.Engine {

	router := gin.Default()

	setUpConfig(router)
	setUpRouter(router)

	return router
}

// アプリケーション設定の初期化
func setUpConfig(router *gin.Engine) {
	// CORS
	router.Use(cors.New(cors.Config{
		// アクセスを許可したいアクセス元
		AllowOrigins: []string{
			`http://localhost:3000`,
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
func setUpRouter(router *gin.Engine) {
	api := router.Group("/api/v1")
	{
		movie.RegisterRouter(api.Group("/movie"))
	}
}

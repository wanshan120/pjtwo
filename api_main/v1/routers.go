package routers

import (
	"api_main/v1/movie"

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

	// redis session
}

// ルーティングの設定
func setUpRouter(router *gin.Engine) {
	api := router.Group("/api/v1")
	{
		movie.RegisterRouter(api.Group("/movie"))
	}
}
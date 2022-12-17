package movie

import (
	"github.com/gin-gonic/gin"
)

// RegisterRouter
func RegisterRouter(r *gin.RouterGroup) {

	// 注册
	r.POST("/", CreateMovieItem())
	// 映画詳細ページ
	r.GET("/:movieId", GetMovieById())
	r.GET("/recommend/:tagId", GetRecommendMovie())
	r.GET("/related/:tagId", GetRelatedMovies())
	// // 登录
	// r.POST("/login", Auth.LoginHandler)

	// auth := r.Group("")
	// auth.Use(Auth.MiddlewareFunc())
	// {
	// 	// 用户列表
	// 	auth.GET("", getUserList)
	// 	// 删除用户
	// 	auth.DELETE("/:id", deleteUserByID)
	// 	// 更新用户信息
	// 	auth.PUT("/:id", updateUserByID)
	// }
}

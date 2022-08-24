package movie

import (
	"github.com/gin-gonic/gin"
)

// RegisterRouter
func RegisterRouter(r *gin.RouterGroup) {

	// 注册
	r.POST("/movie", CreateMovieItem())
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
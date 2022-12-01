package rate

import (
	"github.com/gin-gonic/gin"
)

// RegisterRouter
func RegisterRouter(r *gin.RouterGroup) {

	// 注册

	r.GET("/:productId", GetRatings())

}

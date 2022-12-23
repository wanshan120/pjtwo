package user

import (
	"github.com/gin-gonic/gin"
)

// RegisterRouter
func RegisterRouter(r *gin.RouterGroup) {

	r.POST("/register", ResisterUser)
}

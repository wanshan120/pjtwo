package token

import (
	"github.com/gin-gonic/gin"
)

// RegisterRouter
func RegisterRouter(r *gin.RouterGroup) {

	r.POST("/", GenerateToken)
}

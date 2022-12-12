package review

import (
	"github.com/gin-gonic/gin"
)

// RegisterRouter
func RegisterRouter(r *gin.RouterGroup) {

	r.GET("/:contentId", GetReviewByContentId())

}

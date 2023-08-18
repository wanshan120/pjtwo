package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/wanshan120/pjtwo/go_backend/common/pjtwodb/models"
)

type UserControllers struct {
	UserServices UserServices
}

func NewUserController(userServices UserServices) UserControllers {
	return UserControllers{userServices}
}

func GetMe(ctx *gin.Context) {
	// Gin context structに格納したユーザーオブジェクトを取得
	currentUser := ctx.MustGet("currentUser").(*models.UserRecord)

	ctx.JSON(
		http.StatusOK,
		gin.H{"status": "success", "data": gin.H{"user": models.FilterUserRecordToResponse(currentUser)}},
	)
}

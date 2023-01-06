package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserControllers struct {
	UserServices UserServices
}

func NewUserController(userServices UserServices) UserControllers {
	return UserControllers{userServices}
}

func GetMe(ctx *gin.Context) {
	// Gin context structに格納したユーザーオブジェクトを取得
	currentUser := ctx.MustGet("currentUser").(*DBResponse)

	ctx.JSON(
		http.StatusOK,
		gin.H{"status": "success", "data": gin.H{"user": FilteredResponse(currentUser)}},
	)
}

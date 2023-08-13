package middlewares

// DeserializeUserミドルウェアを作成
// CookiesオブジェクトまたはAuthorizationヘッダーからアクセストークンを抽出し、検証する

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"

	conf "github.com/wanshan120/pjtwo/go_backend/api_main/configs"
	usr "github.com/wanshan120/pjtwo/go_backend/api_main/v1/user"
	"github.com/wanshan120/pjtwo/go_backend/api_main/v1/utils"
)

func DeserializeUser(userServices usr.UserServices) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		// クッキーもしくはヘッダーからアクセストークンの抽出
		var access_token string
		cookie, err := ctx.Cookie("access_token")

		authorizationHeader := ctx.Request.Header.Get("Authorization")
		fields := strings.Fields(authorizationHeader)

		if len(fields) != 0 && fields[0] == "Bearer" {
			fmt.Print("this is Bearer")
			access_token = fields[1]
		} else if err == nil {
			access_token = cookie
		}

		// ログイン確認
		if access_token == "" {
			ctx.AbortWithStatusJSON(
				http.StatusUnauthorized,
				gin.H{"status": "fail", "message": "You are not logged in"})
			return
		}

		// トークンのペイロードに格納したユーザーIDを取得
		configs, _ := conf.LoadConfig(".")
		sub, err := utils.ValidateToken(access_token, configs.AccessTokenPublicKey)
		if err != nil {
			ctx.AbortWithStatusJSON(
				http.StatusUnauthorized, gin.H{"status": "fail", "message": err.Error()})
			return
		}

		// ユーザーがDBに存在するか
		user, err := userServices.FindUserById(fmt.Sprint(sub))
		if err != nil {
			ctx.AbortWithStatusJSON(
				http.StatusUnauthorized, gin.H{"status": "fail", "message": err.Error()})
			return
		}

		// currentUserキーでGinコンテキスト構造体にアタッチ
		ctx.Set("currentUser", user)
		ctx.Next()
	}
}

package auth

import (
	"fmt"
	"net/http"
	"strings"

	usr "github.com/wanshan120/pjtwo/go_backend/api_main/v1/user"
	conf "github.com/wanshan120/pjtwo/go_backend/common/pjtwodb/configs"

	"github.com/wanshan120/pjtwo/go_backend/api_main/v1/utils"
	"github.com/wanshan120/pjtwo/go_backend/common/pjtwodb/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

type AuthControllers struct {
	authServices AuthServices
	userServices usr.UserServices
}

func NewAuthControllers(authServices AuthServices, userServices usr.UserServices) AuthControllers {
	return AuthControllers{authServices, userServices}
}

// ユーザー登録
func (ac *AuthControllers) SignUpUser(ctx *gin.Context) {
	var user *models.SignUpInput

	// 入力値検証
	if err := ctx.ShouldBindJSON(&user); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	if user.Password != user.PasswordConfirm {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status": "fail", "message": "Passwords do not match",
		})
		return
	}

	// 新規ユーザー追加
	newUser, err := ac.authServices.SignUpUser(user)
	if err != nil {
		if strings.Contains(err.Error(), "email already exist") {
			ctx.JSON(http.StatusConflict, gin.H{"status": "error", "message": err.Error()})
			return
		}
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{
		"status": "success", "data": gin.H{"user": models.FilterUserRecordToResponse(newUser)},
	})
}

// ログイン
func (ac *AuthControllers) SignInUser(ctx *gin.Context) {
	var credentials *models.SignInInput

	if err := ctx.BindJSON(&credentials); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	user, err := ac.userServices.FindUserByEmail(credentials.Email)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
			return
		}
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	// PW検証
	if err := utils.VerifyPassword(user.Password, credentials.Password); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	configs, _ := conf.LoadConfig(".")

	// トークン作成
	access_token, err := utils.CreateToken(
		configs.AccessTokenExpiresIn, user.ID, configs.AccessTokenPrivateKey,
	)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"access token": "error", "status": "fail", "message": err.Error()})
		return
	}

	refresh_token, err := utils.CreateToken(
		configs.RefreshTokenExpiresIn, user.ID, configs.RefreshTokenPrivateKey,
	)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"refresh_token": "error", "status": "fail", "message": err.Error()})
		return
	}

	ctx.SetCookie(
		"access_token",
		access_token,
		// configs.AccessTokenMaxAge*60,
		configs.AccessTokenMaxAge*1,
		"/",
		"localhost",
		false,
		true,
	)
	ctx.SetCookie(
		"refresh_token",
		refresh_token,
		// configs.RefreshTokenMaxAge*60*48,
		configs.RefreshTokenMaxAge*3,
		"/",
		"localhost",
		false,
		true,
	)
	ctx.SetCookie(
		"logged_in",
		"true",
		// configs.AccessTokenMaxAge*60,
		configs.AccessTokenMaxAge*1,
		"/",
		"localhost",
		false,
		false,
	)

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "access_token": access_token})
}

// アクセストークンの更新
func (ac *AuthControllers) RefreshAccessToken(ctx *gin.Context) {
	message := "could not refresh access token"

	// リフレッシュトークンがクッキーにあるか
	cookie, err := ctx.Cookie("refresh_token")
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusForbidden, gin.H{
			"status": "fail", "message": "No refresh token exists in cookie"})
		return
	}

	configs, _ := conf.LoadConfig(".")

	// リフレッシュトークンが改ざんされていないか
	sub, err := utils.ValidateToken(cookie, configs.RefreshTokenPublicKey)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusForbidden, gin.H{"status": "fail", "message": message})
		return
	}

	// トークンのユーザーがロガーに存在するか
	user, err := ac.userServices.FindUserById(fmt.Sprint(sub))
	if err != nil {
		ctx.AbortWithStatusJSON(
			http.StatusForbidden,
			gin.H{"status": "fail", "message": "the user belonging to this token no logger exists"})
		return
	}

	// トークン作成
	access_token, err := utils.CreateToken(
		configs.AccessTokenExpiresIn, user.ID, configs.AccessTokenPrivateKey)
	if err != nil {
		ctx.AbortWithStatusJSON(
			http.StatusForbidden, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	ctx.SetCookie(
		"access_token",
		access_token,
		// configs.AccessTokenMaxAge*60,
		configs.AccessTokenMaxAge*1,
		"/",
		"localhost",
		false,
		true,
	)
	ctx.SetCookie(
		"logged_in",
		"true",
		// configs.AccessTokenMaxAge*60,
		configs.AccessTokenMaxAge*1,
		"/",
		"localhost",
		false,
		false,
	)

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "access_token": access_token})
}

// ログアウト
func (ac *AuthControllers) LogoutUser(ctx *gin.Context) {
	ctx.SetCookie("access_token", "", -1, "/", "localhost", false, true)
	ctx.SetCookie("refresh_token", "", -1, "/", "localhost", false, true)
	ctx.SetCookie("logged_in", "", -1, "/", "localhost", false, true)

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": "ログアウトしました"})
}

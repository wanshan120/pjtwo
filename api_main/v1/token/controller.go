package token

import (
	"api_main/auth"
	"api_main/configs"
	"api_main/v1/responses"
	usr "api_main/v1/user"
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// 電子メールの存在確認、パスワードが合致するか確認、その後にトークンを発行する
func GenerateToken(c *gin.Context) {

	var request TokenRequest
	var user usr.User
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(
			http.StatusBadRequest,
			responses.ErrorResponse{
				Status:  http.StatusBadRequest,
				Message: "JSON error",
				Data:    map[string]interface{}{"data": err.Error()},
			},
		)
		c.Abort()
		return
	}

	var coll *mongo.Collection = configs.GetCollection(configs.DB, "users")
	filter := bson.D{{Key: "email", Value: request.Email}}
	err := coll.FindOne(context.TODO(), filter).Decode(&user)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			responses.ErrorResponse{
				Status:  http.StatusInternalServerError,
				Message: "no match",
				Data:    map[string]interface{}{"data": err.Error()},
			},
		)
		c.Abort()
		return
	}

	// credential check
	credentialError := user.CheckPassword(request.Password)
	if credentialError != nil {
		c.JSON(
			http.StatusUnauthorized,
			responses.ErrorResponse{
				Status:  http.StatusUnauthorized,
				Message: "invalid credentials",
				Data:    map[string]interface{}{"data": err.Error()},
			},
		)
		c.Abort()
		return
	}

	// generate jwt
	tokenString, err := auth.GenerateJwt(user.Email, user.UserName)
	if err != nil {
		c.JSON(
			http.StatusUnauthorized,
			responses.ErrorResponse{
				Status:  http.StatusUnauthorized,
				Message: "couldn't jwt",
				Data:    map[string]interface{}{"data": err.Error()},
			},
		)
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}

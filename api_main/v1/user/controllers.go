package user

import (
	"api_main/configs"
	"api_main/v1/responses"
	"context"
	"time"

	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/mongo"
)

func ResisterUser(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// JSONバインド
	var user User
	if err := c.BindJSON(&user); err != nil {
		c.JSON(
			http.StatusBadRequest,
			responses.ErrorResponse{
				Status:  http.StatusBadRequest,
				Message: "JSON bind error",
				Data:    map[string]interface{}{"data": err.Error()},
			},
		)
		c.Abort()
		return
	}
	// PWハッシュ化
	if err := user.HashPassword(user.Password); err != nil {
		c.JSON(
			http.StatusBadRequest,
			responses.ErrorResponse{
				Status:  http.StatusInternalServerError,
				Message: "hash error",
				Data:    map[string]interface{}{"data": err.Error()},
			},
		)
		c.Abort()
		return
	}
	// バリデーション
	var validate = validator.New()
	if err := validate.Struct(&user); err != nil {
		c.JSON(
			http.StatusInternalServerError,
			responses.ErrorResponse{
				Status:  http.StatusInternalServerError,
				Message: "validate error",
				Data:    map[string]interface{}{"data": err.Error()},
			},
		)
		c.Abort()
		return
	}
	// インサート
	var collection *mongo.Collection = configs.GetCollection(configs.DB, "users")
	result, err := collection.InsertOne(ctx, &user)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			responses.ErrorResponse{
				Status:  http.StatusInternalServerError,
				Message: "insert error",
				Data:    map[string]interface{}{"data": err.Error()},
			},
		)
		c.Abort()
		return
	}

	// 200
	c.JSON(
		http.StatusCreated,
		responses.NormalResponse{
			Status:  http.StatusCreated,
			Message: "success",
			Data:    map[string]interface{}{"data": result},
		},
	)

}

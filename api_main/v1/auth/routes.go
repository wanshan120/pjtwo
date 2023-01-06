package auth

import (
	"api_main/configs"
	"api_main/middlewares"
	usr "api_main/v1/user"
	"context"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func AuthRoute(ctx context.Context, client *mongo.Client, rg *gin.RouterGroup) {
	// create instance
	collection := configs.GetCollection(client, "users")
	as := NewAuthService(ctx, collection)
	us := usr.NewUserServiceImpl(ctx, collection)
	ac := NewAuthControllers(as, us)

	rg.POST("/register", ac.SignUpUser)
	rg.POST("/login", ac.SignInUser)
	rg.GET("/refresh", ac.RefreshAccessToken)
	rg.GET("/logout", middlewares.DeserializeUser(us), ac.LogoutUser)
}

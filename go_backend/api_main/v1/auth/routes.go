package auth

import (
	"context"

	"github.com/wanshan120/pjtwo/go_backend/api_main/middlewares"
	usr "github.com/wanshan120/pjtwo/go_backend/api_main/v1/user"
	"github.com/wanshan120/pjtwo/go_backend/common/pjtwodb/configs"

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

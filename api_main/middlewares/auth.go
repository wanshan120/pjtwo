package middlewares

import (
	"api_main/auth"
	"api_main/v1/responses"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Auth() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			c.JSON(
				http.StatusUnauthorized,
				responses.ErrorResponse{
					Status:  http.StatusUnauthorized,
					Message: "request does not contain an access token",
					Data:    map[string]interface{}{"data": ""},
				},
			)
			c.Abort()
			return
		}
		err := auth.ValidateToken(tokenString)
		if err != nil {
			c.JSON(
				http.StatusUnauthorized,
				responses.ErrorResponse{
					Status:  http.StatusUnauthorized,
					Message: "could't varidate token",
					Data:    map[string]interface{}{"data": err.Error()},
				},
			)
			c.Abort()
			return
		}
		c.Next()
	}
}

package rate

import (
	"api_main/configs"
	"api_main/v1/responses"
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"

	// "go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var ratingsCollection *mongo.Collection = configs.GetCollection(configs.DB, "ratings")
var validate = validator.New()

func GetRatings() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		productId := c.Param("productId")
		fmt.Println("productID: ", productId)

		// mongo id object check
		objId, err := primitive.ObjectIDFromHex(productId)
		if err != nil {
			c.JSON(
				http.StatusBadRequest,
				responses.ErrorResponse{
					Status:  http.StatusBadRequest,
					Message: "productId can't decoded",
					Data:    map[string]interface{}{"data": err.Error()},
				},
			)
			return
		}

		// var cursor *mongo.Cursor

		pipeline := bson.A{
			bson.D{{Key: "$match", Value: bson.D{{Key: "productId", Value: objId}}}},
			bson.D{
				{Key: "$group", Value: bson.D{
					{Key: "_id", Value: "$rateValue"},
					{Key: "count", Value: bson.D{{Key: "$sum", Value: 1}}},
				},
				},
			},
		}

		cursor, err := ratingsCollection.Aggregate(ctx, pipeline)
		if err != nil {
			c.JSON(
				http.StatusInternalServerError,
				responses.ErrorResponse{
					Status:  http.StatusInternalServerError,
					Message: "pipeline does not work",
					Data:    map[string]interface{}{"data": err.Error()},
				},
			)
			return
		}

		// display the results
		results := []bson.M{}
		if err = cursor.All(context.TODO(), &results); err != nil {
			c.JSON(
				http.StatusInternalServerError,
				responses.ErrorResponse{
					Status:  http.StatusInternalServerError,
					Message: "cursor does not work",
					Data:    map[string]interface{}{"data": err.Error()},
				},
			)
			return
		}

		if len(results) == 0 {
			c.JSON(
				http.StatusBadRequest,
				responses.ErrorResponse{
					Status:  http.StatusBadRequest,
					Message: "NoRecode",
					Data:    map[string]interface{}{"data": "no recode"},
				},
			)
			return
		}

		c.JSON(
			http.StatusCreated,
			results,
		)
	}
}

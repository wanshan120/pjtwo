package review

import (
	"api_main/configs"
	"api_main/v1/responses"
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"

	// "go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var reviewCollection *mongo.Collection = configs.GetCollection(configs.DB, "reviews")
var validate = validator.New()

func GetReviewByContentId() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		contentId := c.Param("contentId")

		// mongo id object check
		objId, err := primitive.ObjectIDFromHex(contentId)
		if err != nil {
			c.JSON(
				http.StatusBadRequest,
				responses.ErrorResponse{
					Status:  http.StatusBadRequest,
					Message: "reviewId can't decoded",
					Data:    map[string]interface{}{"data": err.Error()},
				},
			)
			return
		}

		// var cursor *mongo.Cursor
		// TODO: 一番人気のレビューを1件取得するように変更
		pipeline := bson.A{
			bson.D{{Key: "$match", Value: bson.D{{Key: "contentId", Value: objId}}}},
			bson.D{{Key: "$limit", Value: 1}},

			bson.D{
				{Key: "$project",
					Value: bson.D{
						{Key: "_id", Value: 1},
						{Key: "userId", Value: 1},
						{Key: "contentId", Value: 1},
						{Key: "title", Value: 1},
						{Key: "content", Value: 1},
						{Key: "updatedAt", Value: 1},
					},
				},
			},
		}

		cursor, err := reviewCollection.Aggregate(ctx, pipeline)
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

		review := []ReviewJson{}
		// var review []bson.D
		if err = cursor.All(ctx, &review); err != nil {
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
		// fmt.Println(review)
		// for _, result := range review {
		// 	fmt.Println("result")
		// 	fmt.Println(result)
		// }
		c.JSON(
			http.StatusCreated,
			&review[0],
		)
	}
}

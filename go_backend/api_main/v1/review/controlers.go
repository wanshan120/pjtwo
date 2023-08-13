package review

import (
	"context"
	"net/http"

	"github.com/wanshan120/pjtwo/go_backend/api_main/v1/responses"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"

	// "go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var validate = validator.New()

func GetReviewByProductId(ctx context.Context, collection *mongo.Collection) gin.HandlerFunc {
	return func(c *gin.Context) {
		productId := c.Param("productId")

		// mongo id object check
		objId, err := primitive.ObjectIDFromHex(productId)
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
			bson.D{{Key: "$match", Value: bson.D{{Key: "productId", Value: objId}}}},
			bson.D{{Key: "$limit", Value: 1}},

			bson.D{
				{Key: "$project",
					Value: bson.D{
						{Key: "_id", Value: 1},
						{Key: "userId", Value: 1},
						{Key: "productId", Value: 1},
						{Key: "title", Value: 1},
						{Key: "content", Value: 1},
						{Key: "updatedAt", Value: 1},
					},
				},
			},
		}

		cursor, err := collection.Aggregate(ctx, pipeline)
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

package movie

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
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var movieCollection *mongo.Collection = configs.GetCollection(configs.DB, "movies")
var validate = validator.New()

func CreateMovieItem() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		var movie_item Movie

		//validate the request body
		if err := c.BindJSON(&movie_item); err != nil {
			c.JSON(
				http.StatusBadRequest,
				responses.NormalResponse{
					Status:  http.StatusBadRequest,
					Message: "JSON error",
					Data:    map[string]interface{}{"data": err.Error()},
				},
			)
			return
		}

		// nested stringify Objectid to Objectid

		tagsid := make([]primitive.ObjectID, len(movie_item.Tags))
		for i := range movie_item.Tags {
			oid, err := primitive.ObjectIDFromHex(movie_item.Tags[i])
			if err != nil {
				panic(err)
			}
			tagsid[i] = oid
		}
		fmt.Println(tagsid)
		fmt.Println(len(tagsid))
		fmt.Println(cap(tagsid))
		//use the validator library to validate required fields
		if validationErr := validate.Struct(&movie_item); validationErr != nil {
			c.JSON(
				http.StatusBadRequest,
				responses.NormalResponse{
					Status:  http.StatusBadRequest,
					Message: "struct error",
					Data:    map[string]interface{}{"data": validationErr.Error(), "response": movie_item},
				},
			)
			return
		}

		newMovie := MovieWrite{
			Id:          primitive.NewObjectID(),
			Title:       movie_item.Title,
			ContentType: movie_item.ContentType,
			Rates:       movie_item.Rates,
			Tags:        tagsid,
		}

		// result, err := movieCollection.InsertOne(
		// 	ctx,
		// 	bson.D{
		// 		{"type", "Masala"},
		// 		{"rating", 10},
		// 		{"vendor", bson.A{"A", "C"}},
		// 	},
		// )

		result, err := movieCollection.InsertOne(ctx, newMovie)
		if err != nil {
			c.JSON(
				http.StatusInternalServerError,
				responses.NormalResponse{
					Status:  http.StatusInternalServerError,
					Message: "insert error",
					Data:    map[string]interface{}{"data": err.Error()},
				},
			)
			return
		}

		c.JSON(
			http.StatusCreated,
			responses.NormalResponse{
				Status:  http.StatusCreated,
				Message: "success",
				Data:    map[string]interface{}{"data": result},
			},
		)
	}
}

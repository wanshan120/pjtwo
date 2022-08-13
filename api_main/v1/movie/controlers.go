package movie

import (
	"api_main/configs"
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type MovieResponse struct {
	Status  int                    `json:"status"`
	Message string                 `json:"message"`
	Data    map[string]interface{} `json:"data"`
}

var movieCollection *mongo.Collection = configs.GetCollection(configs.DB, "movies")
var validate = validator.New()

func CreateUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var movie_item Movie
		defer cancel()

		//validate the request body
		if err := c.BindJSON(&movie_item); err != nil {
			c.JSON(http.StatusBadRequest, MovieResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		//use the validator library to validate required fields
		if validationErr := validate.Struct(&movie_item); validationErr != nil {
			c.JSON(http.StatusBadRequest, MovieResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": validationErr.Error()}})
			return
		}

		newMovie := Movie{
			Id:       primitive.NewObjectID(),
			Name:     movie_item.Name,
			Location: movie_item.Location,
			Title:    movie_item.Title,
		}

		result, err := movieCollection.InsertOne(ctx, newMovie)
		if err != nil {
			c.JSON(http.StatusInternalServerError, MovieResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		c.JSON(http.StatusCreated, MovieResponse{Status: http.StatusCreated, Message: "success", Data: map[string]interface{}{"data": result}})
	}
}
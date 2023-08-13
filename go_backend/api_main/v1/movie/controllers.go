package movie

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type MovieControllers struct {
	movieServices MovieServices
}

func NewMovieController(movieServices MovieServices) MovieControllers {
	return MovieControllers{movieServices}
}

func (mc *MovieControllers) AddMovie(ctx *gin.Context) {
	var movie *AddMovieInput

	// 入力値検証
	if err := ctx.ShouldBindJSON(&movie); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	// 入力値でDB更新
	newMovie, err := mc.movieServices.AddMovie(movie)
	if err != nil {
		if strings.Contains(err.Error(), "ID already exist") {
			ctx.JSON(http.StatusConflict, gin.H{"status": "error", "message": err.Error()})
			return
		}
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": err.Error()})
		return
	}
	ctx.JSON(http.StatusCreated, gin.H{
		"status": "success", "data": gin.H{"movie": FilteredResponse(newMovie)},
	})

}

func (mc *MovieControllers) FindMovieById(ctx *gin.Context) {
	movieId := ctx.Param("movieId")
	oid, err := primitive.ObjectIDFromHex(movieId)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "リクエストの形式が間違っています"})
	}

	movie, err := mc.movieServices.FindMovieById(oid)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
			return
		}
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": gin.H{"movie": movie}})
}

func (mc *MovieControllers) FindRecommendedMovies(ctx *gin.Context) {
	tagId := ctx.Param("tagId")
	oid, err := primitive.ObjectIDFromHex(tagId)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "リクエストの形式が間違っています"})
	}

	movies, err := mc.movieServices.FindRecommendedMovies(oid)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "No Documents"})
			return
		}
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": gin.H{"movies": movies}})
}

func (mc *MovieControllers) FindRelatedMovies(ctx *gin.Context) {
	tagId := ctx.Param("tagId")
	oid, err := primitive.ObjectIDFromHex(tagId)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "リクエストの形式が間違っています"})
		return
	}

	movies, err := mc.movieServices.FindRelatedMovies(oid)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
			return
		}
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": gin.H{"movies": movies}})
}

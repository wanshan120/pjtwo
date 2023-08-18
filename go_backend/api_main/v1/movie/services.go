package movie

import (
	"github.com/wanshan120/pjtwo/go_backend/common/pjtwodb/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type MovieServices interface {
	AddMovie(*models.AddMovieInput) (*models.Movie, error)
	FindMovieById(primitive.ObjectID) (*models.FindMovieDetail, error)            // GetMovieById
	FindRecommendedMovies(primitive.ObjectID) (*[]models.RecommendedMovie, error) // GetRecommendMovie
	FindRelatedMovies(primitive.ObjectID) (*[]models.RelatedMovie, error)         // GetRelatedMovies
}

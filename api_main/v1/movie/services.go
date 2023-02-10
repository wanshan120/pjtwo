package movie

import "go.mongodb.org/mongo-driver/bson/primitive"

type MovieServices interface {
	AddMovie(*AddMovieInput) (*DBResponse, error)                            // CreateMovieItem
	FindMovieById(primitive.ObjectID) (*FindMovieDBResponse, error)          // GetMovieById
	FindRecommendedMovies(primitive.ObjectID) (*[]RecomendDBResponse, error) // GetRecommendMovie
	FindRelatedMovies(primitive.ObjectID) (*[]RelatedMovieDBResponse, error) // GetRelatedMovies
}

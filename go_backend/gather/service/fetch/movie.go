package fetch

import (
	"github.com/wanshan120/pjtwo/go_backend/gather/infra/client"
	"github.com/wanshan120/pjtwo/go_backend/gather/model"
)

type MovieUsecase interface {
	FetchMovies(int, int) ([]model.TMDBMovieDetail, error)
}

type movieUsecase struct {
	tmdbClient client.TMDBClient
}

func NewMovieUsecase(tmdbClient client.TMDBClient) MovieUsecase {
	return &movieUsecase{tmdbClient}
}

func (mu *movieUsecase) FetchMovies(reqCount int, increment int) ([]model.TMDBMovieDetail, error) {
	var allMovies []model.TMDBMovieDetail

	for i := 1; reqCount == 0 || i <= reqCount; i++ {
		movies, err := mu.tmdbClient.GetMoviesByPage(increment + i)
		if err != nil {
			return nil, err
		}
		if len(movies) == 0 {
			break
		}
		allMovies = append(allMovies, movies...)
	}

	return allMovies, nil
}

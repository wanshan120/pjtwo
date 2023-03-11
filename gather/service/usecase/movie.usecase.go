package usecase

import (
	"gather/domain/entity"
	"gather/infra/client"
)

type MovieUsecase interface {
	FetchMovies(int, int) ([]entity.TMDBMovieDetail, error)
}

type movieUsecase struct {
	tmdbClient client.TMDBClient
}

func NewMovieUsecase(tmdbClient client.TMDBClient) MovieUsecase {
	return &movieUsecase{tmdbClient}
}

func (mu *movieUsecase) FetchMovies(reqCount int, increment int) ([]entity.TMDBMovieDetail, error) {
	var allMovies []entity.TMDBMovieDetail

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

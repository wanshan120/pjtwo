package client

import (
	"encoding/json"
	"fmt"
	"gather/domain/entity"
	"net/http"

	"github.com/pkg/errors"
)

type TMDBClient struct {
	BaseURL    string
	APIKey     string
	HTTPClient http.Client
}

func NewTMDBClient(apiKey string) TMDBClient {
	return TMDBClient{
		BaseURL:    "https://api.themoviedb.org/3",
		APIKey:     apiKey,
		HTTPClient: http.Client{},
	}
}

func (c *TMDBClient) GetMoviesByPage(page int) ([]entity.TMDBMovieDetail, error) {
	var movies []entity.TMDBMovieDetail

	reqURL := fmt.Sprintf(
		"https://api.themoviedb.org/3/movie/popular?api_key=%s&language=ja-JP&page=%d", c.APIKey, page)
	resp, err := http.Get(reqURL)
	if err != nil {
		return nil, errors.Wrap(err, "failed to request")
	}
	defer resp.Body.Close()

	var result struct {
		Page         int                       `json:"page"`
		Results      []entity.TMDBPopularMovie `json:"results"`
		TotalPages   int                       `json:"total_pages"`
		TotalResults int                       `json:"total_results"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, errors.Wrap(err, "failed to decode response body")
	}

	for _, r := range result.Results {
		movie, err := c.GetMovieByID(r.ID)
		if err != nil {
			fmt.Println(err)
			continue
		}
		movies = append(movies, movie)
	}

	return movies, nil
}

func (c *TMDBClient) GetMovieByID(id int) (entity.TMDBMovieDetail, error) {
	var movie entity.TMDBMovieDetail

	reqURL := fmt.Sprintf("%s/movie/%d?api_key=%s&language=ja-JP", c.BaseURL, id, c.APIKey)
	resp, err := http.Get(reqURL)
	if err != nil {
		return movie, errors.Wrap(err, "failed to request")
	}
	defer resp.Body.Close()

	if err := json.NewDecoder(resp.Body).Decode(&movie); err != nil {
		return movie, errors.Wrap(err, "failed to decode response body")
	}

	return movie, nil
}

package client

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/wanshan120/pjtwo/go_backend/gather/model"

	"github.com/pkg/errors"
)

type TMDBClient struct {
	BaseURL      string
	APIKey       string
	HTTPClient   http.Client
	requestDelay time.Duration // リクエスト間隔の設定
}

func NewTMDBClient(apiKey string) TMDBClient {
	return TMDBClient{
		BaseURL:      "https://api.themoviedb.org/3",
		APIKey:       apiKey,
		HTTPClient:   http.Client{},
		requestDelay: time.Second, // リクエスト間隔を1秒に設定
	}
}

func (c *TMDBClient) GetMoviesByPage(page int) ([]model.TMDBMovieDetail, error) {
	time.Sleep(c.requestDelay) // リクエスト間隔の分だけ待機

	var movies []model.TMDBMovieDetail

	reqURL := fmt.Sprintf(
		"https://api.themoviedb.org/3/movie/popular?api_key=%s&language=ja-JP&page=%d", c.APIKey, page)
	resp, err := http.Get(reqURL)
	if err != nil {
		return nil, errors.Wrap(err, "failed to request")
	}
	defer resp.Body.Close()

	var result struct {
		Page         int                      `json:"page"`
		Results      []model.TMDBPopularMovie `json:"results"`
		TotalPages   int                      `json:"total_pages"`
		TotalResults int                      `json:"total_results"`
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

func (c *TMDBClient) GetMovieByID(id int) (model.TMDBMovieDetail, error) {
	var movie model.TMDBMovieDetail

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

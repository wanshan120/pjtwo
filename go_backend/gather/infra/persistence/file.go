package persistence

import (
	"encoding/json"
	"os"

	"github.com/wanshan120/pjtwo/go_backend/gather/model"
)

func WriteMoviesToFile(movies []model.TMDBMovieDetail) error {
	file, err := os.OpenFile("movies.json", os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0644)
	if err != nil {
		return err
	}
	defer file.Close()

	enc := json.NewEncoder(file)
	enc.SetIndent("", "  ")
	if err := enc.Encode(movies); err != nil {
		return err
	}
	return nil
}

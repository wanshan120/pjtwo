package main

import (
	"fmt"
	"os"
	"strconv"

	"github.com/wanshan120/pjtwo/go_backend/gather/infra/client"
	"github.com/wanshan120/pjtwo/go_backend/gather/infra/persistence"
	"github.com/wanshan120/pjtwo/go_backend/gather/model"
	"github.com/wanshan120/pjtwo/go_backend/gather/service/fetch"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Fprintln(os.Stderr, "Could not read env file.")
	}
	apiKey := os.Getenv("TMDB_API_KEY")
	if apiKey == "" {
		fmt.Fprintln(os.Stderr, "TMDB_API_KEY is required")
		os.Exit(1)
	}

	tmdbClient := client.NewTMDBClient(apiKey)
	movieUsecase := fetch.NewMovieUsecase(tmdbClient)

	reqCount := 0
	increment := 0
	if len(os.Args) > 1 {
		reqCount, _ = strconv.Atoi(os.Args[1])
	}
	if len(os.Args) > 2 {
		increment, _ = strconv.Atoi(os.Args[2])
	}

	var allMovies []model.TMDBMovieDetail
	var lastPage int

	for i := 1; reqCount == 0 || i <= reqCount; i++ {
		movies, err := movieUsecase.FetchMovies(increment+i, 1)
		if err != nil {
			fmt.Fprintf(os.Stderr, "failed to get movies for page %d: %s\n", i, err)
			fmt.Fprintf(os.Stderr, "restarting from page %d\n", lastPage)
			i = lastPage
			continue
		}
		if len(movies) == 0 {
			break
		}

		lastPage = i
		allMovies = append(allMovies, movies...)

		if i%20 == 0 {
			err := persistence.WriteMoviesToFile(allMovies)
			if err != nil {
				fmt.Fprintln(os.Stderr, err)
				os.Exit(1)
			}

			allMovies = nil
		}
	}

	fmt.Fprintf(os.Stdout, "finished fetching movies up to page %d\n", lastPage)

	if len(allMovies) > 0 {
		err := persistence.WriteMoviesToFile(allMovies)
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
			os.Exit(1)
		}
	}
}

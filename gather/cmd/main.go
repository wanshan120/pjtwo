package main

import (
	"encoding/json"
	"fmt"
	"os"
	"strconv"

	"gather/infra/client"
	"gather/service/usecase"

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
	movieUsecase := usecase.NewMovieUsecase(tmdbClient)

	reqCount := 0
	increment := 0
	if len(os.Args) > 1 {
		reqCount, _ = strconv.Atoi(os.Args[1])
	}
	if len(os.Args) > 2 {
		increment, _ = strconv.Atoi(os.Args[2])
	}

	allMovies, err := movieUsecase.FetchMovies(reqCount, increment)
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}

	// 取得した映画情報をJSON形式で出力する例
	file, err := os.Create("movies.json")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()

	enc := json.NewEncoder(file)
	enc.SetIndent("", "  ")
	if err := enc.Encode(allMovies); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}

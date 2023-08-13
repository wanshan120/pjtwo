package configs

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadMyEnv() {
    env := os.Getenv("ENV_NAME")
    switch env {
    default:
        env = "development.local"
    case "development":
        env = "development"
    case "staging":
        env= "staging"
    case "production":
        env = "production"
    }

    env = ".env." + env
    err := godotenv.Load(env)
    if err != nil {
        log.Fatal(err)
    }
}
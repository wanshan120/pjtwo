package configs

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ConnectDB(ctx context.Context) *mongo.Client {
	ctx1, cancel := context.WithTimeout(ctx, 2*time.Second)
	defer cancel()

	// load my env
	config, err := LoadConfig(".")
	if err != nil {
		log.Fatal("Could not load environment variables", err)
	}

	client, err := mongo.Connect(ctx1, options.Client().ApplyURI(config.DBUri))
	if err != nil {
		log.Fatal(err)
	}

	//ping the database
	err = client.Ping(ctx1, nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connected to MongoDB")
	return client
}

// getting database collections
func GetCollection(client *mongo.Client, collectionName string) *mongo.Collection {
	collection := client.Database("pjtwodb").Collection(collectionName)
	return collection
}

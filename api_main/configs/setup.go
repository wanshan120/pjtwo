package configs

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ConnectDB() *mongo.Client {
	// load my env
	LoadMyEnv()
	fmt.Println("Connecting DB...")
	fmt.Println(os.Getenv("MONGOURI"))
	client, err := mongo.NewClient(options.Client().ApplyURI(os.Getenv("MONGOURI")))
	if err != nil {
		fmt.Println(os.Getenv("MONGOURI"))
		log.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

	//ping the database
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connected to MongoDB")
	return client
}

// Client instance
var DB *mongo.Client = ConnectDB()

// getting database collections
func GetCollection(client *mongo.Client, collectionName string) *mongo.Collection {
	collection := client.Database("pjtwodb").Collection(collectionName)
	fmt.Println("GetCollection to MongoDB")
	return collection
}

package main

import (
	routers "api_main/v1"
	"fmt"
	"os"
)

func main() {
	port := os.Getenv("PORT")
    fmt.Println(port)
    r := routers.InitRouter()
	r.Run()
}

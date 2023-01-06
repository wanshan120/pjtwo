package main

import (
	routers "api_main/v1"
)

func main() {
	r := routers.InitRouter()
	r.Run()
}

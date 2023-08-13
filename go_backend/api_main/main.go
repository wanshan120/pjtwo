package main

import (
	routers "github.com/wanshan120/pjtwo/go_backend/api_main/v1"
)

func main() {
	r := routers.InitRouter()
	r.Run()
}

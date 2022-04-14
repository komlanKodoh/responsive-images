package main

import "github.com/Behemoth11/awaken-email-service/pkg/api"

func main() {
	imageApi := api.New()

	imageApi.Run("127.0.0.1:8080")
}

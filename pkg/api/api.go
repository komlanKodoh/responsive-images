package api

import (
	"github.com/Behemoth11/awaken-email-service/pkg/api/custom_error"
	"github.com/Behemoth11/awaken-email-service/pkg/api/image"
	"github.com/Behemoth11/awaken-email-service/pkg/utils/env"
	"github.com/gin-gonic/gin"
)

func New() Api {
	env.LoadEnv()

	api := Api{
		router: gin.Default(),
	}

	// Mount error handler for centralized/ consistent error handling
	api.Use(custom_error.NewHandler())

	// Mount image service on path '<Root>/image'
	api.Mount(image.NewService(), "/image")

	return api
}

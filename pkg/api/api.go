package api

import (
	"github.com/Behemoth11/awaken-email-service/pkg/api/custom_error"
	"github.com/Behemoth11/awaken-email-service/pkg/api/image"
	"github.com/gin-gonic/gin"
)

func New() Api {
	api := Api{
		router: gin.Default(),
	}

	// delete this 
	api.router.GET("/", func(context *gin.Context){
		context.JSON(200 ,gin.H{ "message": "bro , I am running "})	
	})

	// Mount error handler for centralized/ consistent error handling
	api.Use(custom_error.NewHandler())

	// Mount image service on path '<Root>/api/image'
	api.Mount(image.NewService(), "/image")

	return api
}

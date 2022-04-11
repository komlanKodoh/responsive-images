package api

import (
	"github.com/gin-gonic/gin"
)

// Service Defines the shape of api services
type Service interface {
	RegisterRoutes(routerGroup *gin.RouterGroup)
}

type Api struct {
	router *gin.Engine
}

// Run : start the api
func (api Api) Run() {
	api.router.Run()
}

// Mount : mounts services on api endpoints
func (api *Api) Mount(service Service, relativePath string) {
	service.RegisterRoutes(api.router.Group(relativePath))
}

// Use : add global middlewares to the api
func (api *Api) Use(middleware gin.HandlerFunc) {
	api.router.Use(middleware)
}

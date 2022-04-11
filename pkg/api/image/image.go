package image

import (
	"github.com/Behemoth11/awaken-email-service/pkg/api/custom_error"
	"github.com/gin-gonic/gin"
)

// NewService : Creates an image service
func NewService() Service {
	return Service{}
}

type Service struct{}

func (service Service) RegisterRoutes(routerGroup *gin.RouterGroup) {
	routerGroup.POST("/", handlePost)
}

// handlePost : handles post requests
func handlePost(context *gin.Context) {
	file, header, error := context.Request.FormFile("upload")

	if error != nil {
		context.Error(custom_error.BadRequestError("Request did not contain any file"))
		return
	}

	error = Upload(file, header.Filename)

	if error != nil {
		context.Error(error)
	}
}

func handleGet(context *gin.Context) {

}

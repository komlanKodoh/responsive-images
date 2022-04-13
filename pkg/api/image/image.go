package image

import (
	"archive/zip"
	"bytes"
	"fmt"
	"github.com/Behemoth11/awaken-email-service/pkg/api/custom_error"
	"github.com/Behemoth11/awaken-email-service/pkg/api/image/manipulations"
	"github.com/gin-gonic/gin"
	"image"
	"image/jpeg"
	"io/ioutil"
	"os"
	"path/filepath"
	"time"
)

// NewService : Creates an image service
func NewService() Service {
	return Service{}
}

type Service struct{}

func (service Service) RegisterRoutes(routerGroup *gin.RouterGroup) {
	routerGroup.POST("/", handlePost)
}

var FileLiveSpan = 10 * time.Minute

// handlePost : handles post requests
func handlePost(context *gin.Context) {
	zipBuffer := new(bytes.Buffer)

	file, header, err := context.Request.FormFile("upload")

	if err != nil {
		context.Error(custom_error.BadRequestError("Request did not contain any file"))
		return
	}

	originalImage, _, err := image.Decode(file)

	if err != nil {
		context.Error(err)
	}

	zipWriter := zip.NewWriter(zipBuffer)

	// adding a 200px version to zip
	zipImageVersion(zipWriter, originalImage, 200)

	// adding a 300px version to zip
	zipImageVersion(zipWriter, originalImage, 400)

	// adding a 400px version to zip
	zipImageVersion(zipWriter, originalImage, 700)

	var err_zip = zipWriter.Close()
	if err_zip != nil {
		fmt.Println(err)
	}

	id, _ := genId()
	filePath := "./static/" + fileNameWithoutExtSliceNotation(header.Filename) + "-" + id + ".zip"

	ioutil.WriteFile(filePath, zipBuffer.Bytes(), 0777)

	time.AfterFunc(FileLiveSpan, func() {
		os.Remove(filePath)
	})
}

func fileNameWithoutExtSliceNotation(fileName string) string {
	return fileName[:len(fileName)-len(filepath.Ext(fileName))]
}

// zipImageVersion : adds version of an image with specific size to the zip
func zipImageVersion(zipWriter *zip.Writer, image image.Image, width int) {
	// resizing image to specific width
	resizedImage := manipulations.Resize(image, width)

	// write of a jpeg version
	imageJpeg, _ := zipWriter.Create(fmt.Sprintf("%v.jpeg", width))
	jpeg.Encode(imageJpeg, resizedImage, nil)

	// write of a webp version of the image
	imageWebp, _ := zipWriter.Create(fmt.Sprintf("%v.webp", width))
	jpeg.Encode(imageWebp, resizedImage, nil)
}

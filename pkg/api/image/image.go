package image

import (
	"archive/zip"
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"github.com/Behemoth11/awaken-email-service/pkg/api/custom_error"
	"github.com/Behemoth11/awaken-email-service/pkg/api/image/manipulations"
	"github.com/Behemoth11/awaken-email-service/pkg/utils"
	"github.com/gin-gonic/gin"
	"image"
	"image/jpeg"
	"image/png"
	"io/ioutil"
	"os"
	"path/filepath"
	"time"
)

type Service struct{}

// NewService : Creates an image service
func NewService() Service {
	return Service{}
}

// RegisterRoutes : service routes
func (service Service) RegisterRoutes(routerGroup *gin.RouterGroup) {
	routerGroup.POST("/", handlePost)
}

/** End of service definition **/

var FileLiveSpan = 10 * time.Minute

type optimizerConfig struct {
	Jpeg bool `form:"jpeg"`
	Webp bool `form:"webp"`
	Png  bool `form:"png"`

	Sizes []string `form:"sizes"`

	PlaceholderWidth int `form:"placeholder-width,default=35"`
}

// handlePost : handles post requests
func handlePost(context *gin.Context) {
	var config optimizerConfig
	context.ShouldBind(&config)

	zipBuffer := new(bytes.Buffer)

	file, header, err := context.Request.FormFile("image")

	if err != nil {
		context.Error(err)
		return
	}

	originalImage, _, err := image.Decode(file)

	if err != nil {
		context.Error(err)
		return
	}

	zipWriter := zip.NewWriter(zipBuffer)

	var sizes []int
	_ = json.Unmarshal([]byte(config.Sizes[0]), &sizes)

	if err != nil {
		context.Error(custom_error.BadRequestError("One or more of the sizes you provided is not an integer"))
		return
	}

	//var waitGroup sync.WaitGroup
	//waitGroup.Add(len(sizes))

	for _, size := range sizes {
		//go func() {
		//defer waitGroup.Done()
		// adding a 200px version to zip
		zipImageVersion(zipWriter, originalImage, size, config)
		//}()
	}

	//waitGroup.Wait()
	var errZip = zipWriter.Close()
	if errZip != nil {
		fmt.Println(err)
	}

	id, _ := genId()
	fileName := fileNameWithoutExtSliceNotation(header.Filename) + "-" + id + ".zip"
	filePath := "./static/storage/" + fileName
	ioutil.WriteFile(filePath, zipBuffer.Bytes(), 0777)

	responseData := gin.H{"id": fileName, "placeholder": getImageBase64(originalImage, config.PlaceholderWidth)}

	context.JSON(200, utils.WrapResponse(responseData))

	// Delete the file after FileLiveSpan has passed
	time.AfterFunc(FileLiveSpan, func() {
		os.Remove(filePath)
	})
}

// fileNameWithoutExtSliceNotation : returns the file name without its trailing file extension
func fileNameWithoutExtSliceNotation(fileName string) string {
	return fileName[:len(fileName)-len(filepath.Ext(fileName))]
}

// zipImageVersion : adds version of an image with specific size to a zip writer
func zipImageVersion(zipWriter *zip.Writer, image image.Image, width int, config optimizerConfig) {
	// resizing image to specific width
	resizedImage := manipulations.Resize(image, width)
	// write of a jpeg version
	if config.Jpeg == true {
		imageJpeg, _ := zipWriter.Create(fmt.Sprintf("%v.jpeg", width))
		jpeg.Encode(imageJpeg, resizedImage, nil)
	}

	// write of a webp version of the image
	if config.Webp == true {
		imageWebp, _ := zipWriter.Create(fmt.Sprintf("%v.webp", width))
		jpeg.Encode(imageWebp, resizedImage, nil)
	}

	// write of a png version of the image
	if config.Png == true {
		imagePng, _ := zipWriter.Create(fmt.Sprintf("%v.png", width))
		png.Encode(imagePng, resizedImage)
	}
}

// getImageBase64 : Returns a base64 encoded version of the given image
func getImageBase64(image image.Image, width int) string {
	buffer := new(bytes.Buffer)

	resizedImage := manipulations.Resize(image, width)

	jpeg.Encode(buffer, resizedImage, nil)

	return `data:image/png;base64,` + base64.StdEncoding.EncodeToString(buffer.Bytes())
}

package manipulations

import (
	"github.com/disintegration/imaging"
	"image"
)

// Crop : crop an image to the given dimensions
func Crop(image image.Image) image.Image {
	newImage := imaging.Resize(image, 200, 0, imaging.Lanczos)

	return newImage
}

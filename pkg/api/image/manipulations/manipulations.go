package manipulations

import (
	"github.com/disintegration/imaging"
	"image"
)

// Resize : crop an image to the given dimensions
func Resize(image image.Image, width int) image.Image {
	newImage := imaging.Resize(image, width, 0, imaging.Lanczos)

	return newImage
}

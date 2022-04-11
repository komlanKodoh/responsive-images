package image

import (
	"github.com/Behemoth11/awaken-email-service/pkg/utils/aws"
	"io"
)

func Upload(file io.Reader, filename string) error {
	err := aws.UploadFile(file, filename)

	if err != nil {
		return err
	}

	return nil
}

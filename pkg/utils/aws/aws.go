package aws

import (
	"fmt"
	"github.com/Behemoth11/awaken-email-service/pkg/utils/env"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"io"
	"os"
)

// GetAWSSession : get a aws s3 session than can be used to read and write to s3 storage
func GetAWSSession() *session.Session {

	AwsRegion := env.GetEnv("AWS_REGION")
	AwsAccessKeyId := env.GetEnv("AWS_ACCESS_KEY_ID")
	AwsSecretAccessKey := env.GetEnv("AWS_SECRET_ACCESS_KEY")

	session, error := session.NewSession(
		&aws.Config{
			Region: aws.String(AwsRegion),
			Credentials: credentials.NewStaticCredentials(
				AwsAccessKeyId,
				AwsSecretAccessKey,
				"", // a token will be created when the session it's used.
			),
		})

	if error != nil {
		panic(session)
	}

	return session
}

func UploadFile(file io.Reader, filename string) error {
	MyBucket := env.GetEnv("BUCKET_NAME")

	sess := GetAWSSession()

	uploader := s3manager.NewUploader(sess)

	//upload to the s3 bucket
	_, err := uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(MyBucket),
		Key:    aws.String(filename),
		Body:   file,
	})

	if err != nil {
		return err
	}
	return nil
}

func GetFile(filename string) {
	MyBucket := env.GetEnv("BUCKET_NAME")

	sess := GetAWSSession()

	downloader := s3manager.NewDownloader(sess)

	f, err := os.Create(filename)

	if err != nil {
		return fmt.Errorf("failed to create file %q, %v", filename, err)
	}

	n, err := downloader.Download(f, &s3.GetObjectInput{
		Bucket: aws.String(MyBucket),
		Key:    aws.String(filename),
	})
}
func getImageUrl(filename string) string {
	AwsRegion := env.GetEnv("AWS_REGION")
	MyBucket := env.GetEnv("BUCKET_NAME")

	return "https://" + MyBucket + "." + "s3-" + AwsRegion + ".amazonaws.com/" + filename
}

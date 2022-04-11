package env

import (
	"github.com/joho/godotenv"
	"log"
	"os"
)

// GetEnv : get env value
func GetEnv(key string) string {
	return os.Getenv(key)
}

// LoadEnv : load env from .env present in the root directory
func LoadEnv() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file")
		os.Exit(1)
	}
}

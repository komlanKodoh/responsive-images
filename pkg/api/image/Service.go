package image

import (
	"fmt"
	"github.com/sony/sonyflake"
)

var flake = sonyflake.NewSonyflake(sonyflake.Settings{})

func genId() (string, error) {
	id, err := flake.NextID()

	if err != nil {
		return "", err
	}
	return fmt.Sprintf("%x", id), nil
}

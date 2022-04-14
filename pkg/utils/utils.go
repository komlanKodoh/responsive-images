package utils

func WrapResponse(response interface{}) interface{} {
	type responseWrapper struct {
		Data interface{} `json:"data"`
	}
	return responseWrapper{
		Data: response,
	}
}

package custom_error

func BadRequestError(message string) ApiError {
	return NewApiError(400, message)
}

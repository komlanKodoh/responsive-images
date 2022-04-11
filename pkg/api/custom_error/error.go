package custom_error

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

// ApiErrorResponse : Wrapper over ApiError. ( This struct is what will be sent to the client )
type ApiErrorResponse struct {
	Error ApiError `json:"error"`
}

// ApiError : Api error schema
type ApiError struct {
	Code      int    `json:"code"`
	Status    string `json:"status"`
	Message   string `json:"message"`
	Timestamp string `json:"timestamp"`
}

// NewApiError : Returns an instance of ApiError
func NewApiError(code int, message string) ApiError {
	return ApiError{
		Code:      code,
		Message:   message,
		Status:    http.StatusText(code),
		Timestamp: time.Now().Format(time.RFC850),
	}
}

func (apiError ApiError) Error() string {
	return apiError.Message
}

// NewHandler : returns an instance of the global error handler
func NewHandler() gin.HandlerFunc {
	return handleError
}

// handleError : Global error handler
func handleError(context *gin.Context) {

	context.Next()

	detectedErrors := context.Errors.ByType(gin.ErrorTypeAny)

	for _, _err := range detectedErrors {
		err := _err.Err
		var parsedError ApiError

		switch err.(type) {

		case ApiError:
			parsedError = err.(ApiError)
			break

		default:
			parsedError = NewApiError(http.StatusInternalServerError, err.Error())

		}

		context.JSON(parsedError.Code, ApiErrorResponse{Error: parsedError})
		return
	}

}

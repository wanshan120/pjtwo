package auth

import (
	"github.com/wanshan120/pjtwo/go_backend/common/pjtwodb/models"
)

type AuthServices interface {
	SignUpUser(*models.SignUpInput) (*models.UserRecord, error)
	SignInUser(*models.SignInInput) (*models.UserRecord, error)
}

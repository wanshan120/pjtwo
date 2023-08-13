package auth

import (
	"github.com/wanshan120/pjtwo/go_backend/api_main/v1/user"
)

type AuthServices interface {
	SignUpUser(*user.SignUpInput) (*user.DBResponse, error)
	SignInUser(*user.SignInInput) (*user.DBResponse, error)
}

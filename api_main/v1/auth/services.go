package auth

import (
	"api_main/v1/user"
)

type AuthServices interface {
	SignUpUser(*user.SignUpInput) (*user.DBResponse, error)
	SignInUser(*user.SignInInput) (*user.DBResponse, error)
}

package user

import "github.com/wanshan120/pjtwo/go_backend/common/pjtwodb/models"

type UserServices interface {
	FindUserById(string) (*models.UserRecord, error)
	FindUserByEmail(string) (*models.UserRecord, error)
}

package user

type UserServices interface {
	FindUserById(string) (*DBResponse, error)
	FindUserByEmail(string) (*DBResponse, error)
}

package auth

import (
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

var jwtKey = []byte(os.Getenv("SECKEY"))

type JWTClaim struct {
	UserName string `json:"userName"`
	Email    string `json:"email"`
	jwt.StandardClaims
}

func GenerateJwt(email string, username string) (tokenString string, err error) {
	// 一時間の有効期限
	expirationTime := time.Now().Add(1 * time.Hour)
	// claim = Base64でエンコードされた任意のデータを含むJSON文字列
	claims := &JWTClaim{
		Email:    email,
		UserName: username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err = token.SignedString(jwtKey)
	return
}

func ValidateToken(signedToken string) (err error) {
	token, err := jwt.ParseWithClaims(
		signedToken,
		&JWTClaim{},
		func(token *jwt.Token) (interface{}, error) {
			return []byte(jwtKey), nil
		},
	)
	if err != nil {
		return
	}
	claims, ok := token.Claims.(*JWTClaim)
	if !ok {
		err = errors.New("couldn't parse claims")
		return
	}
	if claims.ExpiresAt < time.Now().Local().Unix() {
		err = errors.New("token expired")
		return
	}
	return
}

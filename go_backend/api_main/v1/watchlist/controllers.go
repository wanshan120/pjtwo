package watchlist

import (
	"net/http"
	"strings"

	usr "github.com/wanshan120/pjtwo/go_backend/api_main/v1/user"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type WatchlistControllers struct {
	watchlistServices WatchlistServices
}

func NewWatchlistController(watchlistServices WatchlistServices) WatchlistControllers {
	return WatchlistControllers{watchlistServices}
}

func (wc *WatchlistControllers) Add(ctx *gin.Context) {
	// 入力値でDB更新
	movieId, _ := primitive.ObjectIDFromHex(ctx.Param("movieId"))
	user := ctx.MustGet("currentUser").(*usr.DBResponse)
	newWached, err := wc.watchlistServices.Add(movieId, user.ID)
	if err != nil {
		if strings.Contains(err.Error(), "already exist") {
			ctx.JSON(http.StatusConflict, gin.H{"status": "error", "message": err.Error()})
			return
		}
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": err.Error()})
		return
	}
	ctx.JSON(http.StatusCreated, gin.H{
		"status": "success", "data": gin.H{"watchlist": newWached},
	})
}

func (wc *WatchlistControllers) Delete(ctx *gin.Context) {
	movieId, _ := primitive.ObjectIDFromHex(ctx.Param("movieId"))
	user := ctx.MustGet("currentUser").(*usr.DBResponse)

	err := wc.watchlistServices.Delete(movieId, user.ID)
	if err != nil {
		if strings.Contains(err.Error(), "already exists") {
			ctx.JSON(http.StatusNotFound, gin.H{"status": "fail", "message": err.Error()})
			return
		}
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	ctx.JSON(http.StatusNoContent, nil)
}

func (wc *WatchlistControllers) FindOne(ctx *gin.Context) {
	// 入力値でDB更新
	movieId, _ := primitive.ObjectIDFromHex(ctx.Param("movieId"))
	user := ctx.MustGet("currentUser").(*usr.DBResponse)
	watchlist, err := wc.watchlistServices.FindOne(movieId, user.ID)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			// Nodocumentsでも正常系で返す
			ctx.JSON(http.StatusCreated, gin.H{
				"status": "success", "data": nil,
			})
			return
		}
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{
		"status": "success", "data": gin.H{"watchlist": watchlist},
	})
}

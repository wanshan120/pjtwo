package rate

import (
	"net/http"

	"github.com/gin-gonic/gin"

	// "go.mongodb.org/mongo-driver/bson"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type RateControllers struct {
	rateServices RateServices
}

func NewRateController(rateServices RateServices) RateControllers {
	return RateControllers{rateServices}
}

func (rc *RateControllers) FindRatings(ctx *gin.Context) {
	productId := ctx.Param("productId")
	oid, err := primitive.ObjectIDFromHex(productId)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status": "fail", "message": "リクエストの形式が間違っています",
		})
		return
	}

	rates, err := rc.rateServices.FindRatings(oid)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
			return
		}
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": gin.H{"rates": rates}})
}

import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { recommendCropsService } from '../services/cropRecommandation.service.js'

export const getSuggestion = asyncHandler(async (req, res) => {
    const { farmLandId } = req.params
    const farmerId = req.user._id

    const { season, weather, recommendations } = await recommendCropsService({ farmerId, farmLandId })

    req.activityLog = {
        userId: req.user._id,
        role: "farmer",
        action: "CROP_SUGGESTION",
        message: "crop suggestion  model is used by the farmer",
        metadata: {
            farmerId: req.user._id,
            recommendations
        }
    }


    return res.status(200).json(new ApiResponse(200, { season, weather, recommendations }, 'Crop suggestion is successfull'))

})
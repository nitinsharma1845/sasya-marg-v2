import { ApiError } from "../utils/apiError.js"
import { runCropExpertSystem } from "../expertsystem/index.js"
import { PredictHistory } from "../models/predictHistory.model.js"
import { FarmLand } from "../models/farmLand.model.js"

export const recommendCropsService = async ({ farmerId, farmLandId }) => {
  const farmland = await FarmLand.findOne({
    _id: farmLandId,
    owner: farmerId
  }).populate("location").lean()

  if (!farmland) throw new ApiError(404, "Farmland not found")

  const {
    facts,
    confidence,
    weatherSnapshot,
    recommendations
  } = await runCropExpertSystem({ farmerId, farmLandId })

  if (!recommendations.length)
    throw new ApiError(404, "No suitable crop found")

  const farmlandSnapshot = {
    name: farmland.name,
    size: farmland.size,
    soilType: farmland.soilType,
    water: farmland.water,
    budget: farmland.budget,
    location: farmland.location
      ? {
        locality: farmland.location.locality,
        district: farmland.location.district,
        state: farmland.location.state,
        country: farmland.location.country
      }
      : null
  }

  await PredictHistory.create({
    farmer: farmerId,
    farmLand: farmLandId,
    factsSnapshot: facts,
    farmLandSnapshot: farmlandSnapshot,
    weatherSnapshot,
    result: recommendations
  })

  return {
    season: facts.season,
    weather: weatherSnapshot,
    recommendations
  }
}

import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { authLayer } from '../middleware/auth.middleware.js'
import { getWeatherSchema } from '../validator/weather.validator.js'
import { getWeather } from '../controllers/weather.controller.js'
import { activeFarmer } from '../middleware/aciveFarmer.middleware.js'


export const weatherRoutes = Router()


weatherRoutes.get("/:locationId", authLayer, activeFarmer, validate(getWeatherSchema), getWeather)
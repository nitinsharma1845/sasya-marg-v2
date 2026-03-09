import { Router } from 'express'
import { validate } from "../middleware/validate.middleware.js"
import { authLayer } from "../middleware/auth.middleware.js"
import { createApiLimiter, normalApiLimiter } from "../middleware/rate limiter/authRateLimiter.js"
import { requireSuperAdmin } from '../middleware/adminRole.middleware.js'
import { getCampaignsSchema, getCampaignStatusScheme, sendEmailCampaignSchema } from '../validator/emailCampaign.validator.js'
import { getCampaigns, getCampaignStatus, sendEmailCampaign } from '../controllers/emailCampaign.controller.js'


export const campaignRoutes = Router()

campaignRoutes.post('/', createApiLimiter, authLayer, requireSuperAdmin, validate(sendEmailCampaignSchema), sendEmailCampaign)

campaignRoutes.get('/', normalApiLimiter, authLayer, requireSuperAdmin, validate(getCampaignsSchema), getCampaigns)

campaignRoutes.get('/:campaignId/status', normalApiLimiter, authLayer, requireSuperAdmin, validate(getCampaignStatusScheme), getCampaignStatus)
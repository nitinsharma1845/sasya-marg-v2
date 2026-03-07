import { Router } from "express"

import {
  createScheme,
  getAllSchemesAdmin,
  updateScheme,
  toggleScheme,
  getSchemesForFarmer,
  getAllSchemesForFarmer,
  getSingleScheme
} from "../controllers/governmentScheme.controller.js"

import { authLayer } from "../middleware/auth.middleware.js"
import { requireAdmin } from "../middleware/adminRole.middleware.js"
import { authorize } from "../middleware/role.middleware.js"

import { validate } from "../middleware/validate.middleware.js"

import {
  createSchemeSchema,
  updateSchemeSchema,
  getAllSchemesAdminSchema,
  toggleSchemeSchema,
  getSchemesForFarmerSchema,
  getAllSchemeFarmerSchema,
  getSingleSchemeValidator
} from "../validator/governmentScheme.validator.js"
import { activeFarmer } from "../middleware/aciveFarmer.middleware.js"
import { createApiLimiter, normalApiLimiter, updateApiLimiter } from "../middleware/rate limiter/authRateLimiter.js"


export const schemeRouter = Router()



schemeRouter.post(
  "/admin/schemes",
  createApiLimiter,
  authLayer,
  requireAdmin,
  validate(createSchemeSchema),
  createScheme
)

schemeRouter.post(
  "/farmer/schemes",
  updateApiLimiter,
  authLayer,
  activeFarmer,
  validate(createSchemeSchema),
  createScheme
)



schemeRouter.get(
  "/admin/schemes",
  normalApiLimiter,
  authLayer,
  requireAdmin,
  validate(getAllSchemesAdminSchema),
  getAllSchemesAdmin
)


schemeRouter.patch(
  "/admin/schemes/:id",
  updateApiLimiter,
  authLayer,
  requireAdmin,
  validate(updateSchemeSchema),
  updateScheme
)

schemeRouter.get(
  "/admin/schemes/:schemeId",
  normalApiLimiter,
  authLayer,
  requireAdmin,
  validate(getSingleSchemeValidator),
  getSingleScheme
)

schemeRouter.patch(
  "/admin/schemes/:id/toggle",
  updateApiLimiter,
  authLayer,
  requireAdmin,
  validate(toggleSchemeSchema),
  toggleScheme
)


schemeRouter.get(
  "/farmer/schemes",
  normalApiLimiter,
  authLayer,
  authorize("farmer"),
  activeFarmer,
  validate(getSchemesForFarmerSchema),
  getSchemesForFarmer
)

schemeRouter.get(
  "/farmer/schemes/all",
  normalApiLimiter,
  authLayer,
  authorize("farmer"),
  activeFarmer,
  validate(getAllSchemeFarmerSchema),
  getAllSchemesForFarmer
)


schemeRouter.get(
  "/farmer/schemes/:schemeId",
  normalApiLimiter,
  authLayer,
  authorize("farmer"),
  activeFarmer,
  validate(getSingleSchemeValidator),
  getSingleScheme
)


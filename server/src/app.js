import express, { urlencoded, json } from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
import { ApiError } from './utils/apiError.js';
import { ApiResponse } from './utils/apiResponse.js';
import { errorHandler } from './middleware/error.middleware.js';
import { farmerRoutes } from './routes/farmer.routes.js';
import { otpRoutes } from './routes/otp.routes.js';
import { farmLandRoutes } from './routes/farmLand.routes.js';
import { weatherRoutes } from './routes/weather.routes.js';
import { previousCropRoutes } from './routes/previousCrop.routes.js';
import { suggestionRoutes } from './routes/cropSuggestion.routes.js';
import { historyRoutes } from './routes/predictHistory.routes.js'
import { buyerRouter } from './routes/buyer.routes.js';
import { preHarvestListingRoute } from './routes/preHarvestListing.routes.js';
import { adminRoutes } from './routes/admin.routes.js';
import { queryRoutes } from './routes/query.routes.js';
import { productRouter } from './routes/product.route.js';
import { wishListRouter } from './routes/wishList.routes.js';
import { schemeRouter } from './routes/governmentScheme.routes.js';
import { authRouter } from './routes/auth.routes.js';
import { reportRouter } from './routes/productReport.route.js';
import { activityLogger } from './middleware/logActivity.middleware.js';



export const app = express()

const allowedOrigins = process.env.ORIGIN
    ? process.env.ORIGIN.split(",")
    : [];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(cookieParser())
app.use(activityLogger)


app.get("/error-test", async (req, res) => {
    throw new ApiError(404, "New error");
});

app.post("/response-test", async (req, res) => {
    res.status(200).json(new ApiResponse(200, null));
});

//common
app.use("/api/v2/auth", authRouter)


//Farmer Routes
app.use('/api/v2/farmer', farmerRoutes)
app.use('/api/v2/otp', otpRoutes)
app.use('/api/v2/farmland', farmLandRoutes)
app.use('/api/v2/weather', weatherRoutes)
app.use('/api/v2/previous-crop', previousCropRoutes)
app.use('/api/v2/crop-suggestion', suggestionRoutes)
app.use('/api/v2/suggestion/history', historyRoutes)
app.use('/api/v2/product/', productRouter)
app.use('/api/v2/product/pre-harvest', preHarvestListingRoute)
app.use('/api/v2/query', queryRoutes)
app.use('/api/v2/product-report', reportRouter)


//Admin Routes
app.use('/api/v2/admin/', adminRoutes)


//Buyer Routes
app.use('/api/v2/buyer', buyerRouter)
app.use('/api/v2/buyer/wishlist', wishListRouter)

//scheme routes
app.use("/api/v2", schemeRouter)




app.use(errorHandler)
import mongoose from "mongoose";

const predictHistorySchema = new mongoose.Schema({
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Farmer",
        required: true,
        index: true
    },
    farmLand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FarmLand",
        required: true,
        index: true
    },

    weatherSnapshot: {
        type: Object,
        default: {}
    },

    factsSnapshot: {
        type: Object,
        default: {}
    },

    farmLandSnapshot: {
        type: Object,
        default: {}
    },

    result: {
        type: [
            {
                cropId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Crop"
                },
                crop: String,
                durationRange: {
                    min: Number,
                    max: Number
                },
                waterRequirement: String,
                score: Number,
                reasons: [String],
                note: String,
                missingFactors: [String]
            }
        ],
        required: true
    }
}, { timestamps: true })

export const PredictHistory = mongoose.model("PredictHistory", predictHistorySchema)
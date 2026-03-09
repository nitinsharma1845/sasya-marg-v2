import mongoose from "mongoose"

const emailCampaignSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  subject: {
    type: String,
    required: true
  },

  message: {
    type: String,
    required: true
  },

  totalRecipients: {
    type: Number,
    default: 0
  },

  sentCount: {
    type: Number,
    default: 0
  },

  failedCount: {
    type: Number,
    default: 0
  },

  progress: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    enum: ["pending", "sending", "completed", "failed"],
    default: "pending"
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true
  }

}, { timestamps: true })

export default mongoose.model("EmailCampaign", emailCampaignSchema)
import mongoose from "mongoose";

const productReportSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Buyer",
      required: true
    },

    refrence: {
      type: String,
      trim: true
    },

    reason: {
      type: String,
      enum: [
        "FAKE_PRODUCT",
        "MISLEADING_INFO",
        "PRICE_FRAUD",
        "DUPLICATE_LISTING",
        "SPAM",
        "OTHER"
      ],
      required: true
    },
    description: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "action_taken", "rejected"],
      default: "pending"
    },
    adminRemark: {
      type: String,
      trim: true
    },

    evidence: [
      {
        url: String,
        publicId: String
      }
    ],
    
    repliedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin"
    },
  },
  { timestamps: true }
);

productReportSchema.index(
  { buyer: 1, refrence: 1 },
  {
    unique: true,
    partialFilterExpression: {
      refrence: { $exists: true }
    }
  }
);


export const ProductReport = mongoose.model(
  "ProductReport",
  productReportSchema
);

// hah om sai ram om bhaskaraya namaha om namaha sivayaa

import mongoose from "mongoose";

const IncidentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    message: String,
    stage: {
      type: String,
      enum: ["investigating", "identified", "monitoring", "resolved"],
      default: "investigating",
    },
    category: {
      type: String,
      enum: [
        "degraded",
        "partial-outage",
        "major-outage",
        "under-maintenance",
        "operational",
      ],
      default: "degraded",
    },
    componentsAffected: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Component" },
    ],
    page: { type: mongoose.Schema.Types.ObjectId, ref: "Page", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Incident", IncidentSchema);

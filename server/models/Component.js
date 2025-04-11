// hah om sai ram om bhaskaraya namaha om namaha sivayaa

import mongoose from "mongoose";

const ComponentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    status: {
      type: String,
      enum: [
        "operational",
        "degraded",
        "partial-outage",
        "major-outage",
        "under-maintenance",
      ],
      default: "operational",
    },
    page: { type: mongoose.Schema.Types.ObjectId, ref: "Page", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Component", ComponentSchema);

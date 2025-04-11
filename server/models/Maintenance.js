// hah om sai ram om bhaskaraaya namaha om namaha sivayaa

import mongoose from "mongoose";

const MaintenanceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    scheduledFor: { type: Date, required: true },
    durationMinutes: { type: Number, required: true },
    componentsAffected: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Component" },
    ],
    page: { type: mongoose.Schema.Types.ObjectId, ref: "Page", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Maintenance", MaintenanceSchema);

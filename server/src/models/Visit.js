import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const visitSchema = new Schema(
  {
    path: { type: String, required: true, trim: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

visitSchema.index({ path: 1, date: 1 }, { unique: true });

export default models.Visit ?? model("Visit", visitSchema);
import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const eventSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    location: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    link: { type: String, trim: true, default: "" },
    published: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

eventSchema.index({ date: 1 });
eventSchema.index({ published: 1, date: 1 });

export default models.Event ?? model("Event", eventSchema);
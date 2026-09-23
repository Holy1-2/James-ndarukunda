import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const galleryImageSchema = new Schema(
  {
    title: { type: String, trim: true, default: "" },
    url: { type: String, required: true },
    filename: { type: String, required: true },
  },
  { timestamps: true }
);

galleryImageSchema.index({ createdAt: -1 });

export default models.GalleryImage ??
  model("GalleryImage", galleryImageSchema);
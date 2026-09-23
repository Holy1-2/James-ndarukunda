import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const siteInfoSchema = new Schema(
  {
    contactEmail: { type: String, trim: true, default: "" },
    contactPhone: { type: String, trim: true, default: "" },
    based: { type: String, trim: true, default: "" },
    availability: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

export default models.SiteInfo ?? model("SiteInfo", siteInfoSchema);
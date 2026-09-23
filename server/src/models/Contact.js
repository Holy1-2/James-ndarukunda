import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const contactSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, default: "" },
    inquiryType: { type: String, trim: true, default: "" },
    message: { type: String, required: true, trim: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

contactSchema.index({ createdAt: -1 });

export default models.Contact ?? model("Contact", contactSchema);
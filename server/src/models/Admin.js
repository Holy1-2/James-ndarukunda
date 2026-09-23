import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const adminSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.Admin ?? model("Admin", adminSchema);
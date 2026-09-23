import { statSync, unlinkSync } from "node:fs";
import path from "node:path";
import { isValidObjectId } from "mongoose";
import { Router } from "express";
import GalleryImage from "../models/GalleryImage.js";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/error.js";
import { uploadGalleryImage, UPLOAD_DIR } from "../utils/uploads.js";

const router = Router();

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const images = await GalleryImage.find().sort({ createdAt: -1 }).lean();
    res.json({ images });
  })
);

router.post(
  "/",
  requireAuth,
  (req, res, next) => {
    uploadGalleryImage(req, res, (err) => {
      if (err) {
        res.status(err.statusCode ?? 400).json({ message: err.message });
        return;
      }
      next();
    });
  },
  asyncHandler(async (req, res) => {
    if (!req.file) {
      res.status(400).json({ message: "No image file provided." });
      return;
    }
    const image = await GalleryImage.create({
      title: String(req.body?.title ?? "").trim(),
      filename: req.file.filename,
      url: `/uploads/${req.file.filename}`,
    });
    res.status(201).json({ image });
  })
);

router.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
      res.status(400).json({ message: "Invalid id." });
      return;
    }
    const image = await GalleryImage.findByIdAndDelete(req.params.id).lean();
    if (!image) {
      res.status(404).json({ message: "Image not found." });
      return;
    }
    const filePath = path.join(UPLOAD_DIR, image.filename);
    try {
      statSync(filePath);
      unlinkSync(filePath);
    } catch {
      // File already gone — that's fine.
    }
    res.json({ message: "Image deleted." });
  })
);

export { router };
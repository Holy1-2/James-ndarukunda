import { Router } from "express";
import SiteInfo from "../models/SiteInfo.js";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/error.js";

const router = Router();

const FIELDS = ["contactEmail", "contactPhone", "based", "availability"];

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const doc = await SiteInfo.findOne().sort({ createdAt: -1 }).lean();
    res.json({ siteInfo: doc ?? {} });
  })
);

router.put(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const body = req.body ?? {};
    const patch = {};
    for (const field of FIELDS) {
      if (body[field] !== undefined) patch[field] = String(body[field]).trim();
    }

    let doc = await SiteInfo.findOne().sort({ createdAt: -1 });
    if (doc) {
      doc.set(patch);
      await doc.save();
    } else {
      doc = await SiteInfo.create(patch);
    }

    res.json({ siteInfo: doc });
  })
);

export { router };
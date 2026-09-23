import { isValidObjectId } from "mongoose";
import { Router } from "express";
import Event from "../models/Event.js";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/error.js";

const router = Router();

function cleanEvent(body) {
  return {
    title: String(body?.title ?? "").trim(),
    date: body?.date ? new Date(body.date) : null,
    location: String(body?.location ?? "").trim(),
    description: String(body?.description ?? "").trim(),
    link: String(body?.link ?? "").trim(),
    published: body?.published === undefined ? true : Boolean(body.published),
    order: Number(body?.order ?? 0),
  };
}

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const events = await Event.find()
      .sort({ date: 1 })
      .lean();
    res.json({ events });
  })
);

router.get(
  "/upcoming",
  asyncHandler(async (req, res) => {
    const from = new Date();
    from.setHours(0, 0, 0, 0);
    const events = await Event.find({ published: true, date: { $gte: from } })
      .sort({ date: 1 })
      .lean();
    res.json({ events });
  })
);

router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const data = cleanEvent(req.body);
    if (!data.title) {
      res.status(400).json({ message: "A title is required." });
      return;
    }
    if (!data.date) {
      res.status(400).json({ message: "A valid date is required." });
      return;
    }
    const event = await Event.create(data);
    res.status(201).json({ event });
  })
);

router.patch(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
      res.status(400).json({ message: "Invalid id." });
      return;
    }
    const data = cleanEvent(req.body);
    if (!data.title) {
      res.status(400).json({ message: "A title is required." });
      return;
    }
    const event = await Event.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    }).lean();
    if (!event) {
      res.status(404).json({ message: "Event not found." });
      return;
    }
    res.json({ event });
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
    const event = await Event.findByIdAndDelete(req.params.id).lean();
    if (!event) {
      res.status(404).json({ message: "Event not found." });
      return;
    }
    res.json({ message: "Event deleted." });
  })
);

export { router };
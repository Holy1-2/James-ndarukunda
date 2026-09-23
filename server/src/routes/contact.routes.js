import { Router } from "express";
import Contact from "../models/Contact.js";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/error.js";

const router = Router();

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, phone, inquiryType, message } = req.body ?? {};

    if (!name || !email || !message) {
      res.status(400).json({ message: "Name, email and message are required." });
      return;
    }

    const contact = await Contact.create({
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone ?? "").trim(),
      inquiryType: String(inquiryType ?? "").trim(),
      message: String(message).trim(),
    });

    res.status(201).json({
      message: "Message received. Thank you for reaching out.",
      contact,
    });
  })
);

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();
    res.json({ contacts });
  })
);

router.get(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id).lean();
    if (!contact) {
      res.status(404).json({ message: "Contact message not found." });
      return;
    }
    res.json({ contact });
  })
);

router.patch(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: { read: Boolean(req.body?.read) } },
      { new: true, runValidators: true }
    ).lean();
    if (!contact) {
      res.status(404).json({ message: "Contact message not found." });
      return;
    }
    res.json({ contact });
  })
);

router.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndDelete(req.params.id).lean();
    if (!contact) {
      res.status(404).json({ message: "Contact message not found." });
      return;
    }
    res.json({ message: "Message deleted." });
  })
);

export { router };
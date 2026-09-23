import { Router } from "express";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import { requireAuth, signToken } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/error.js";

const router = Router();

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { username, password } = req.body ?? {};
    if (!username || !password) {
      res.status(400).json({ message: "Username and password are required." });
      return;
    }

    const admin = await Admin.findOne({ username: String(username).trim() });
    const ok = admin && (await bcrypt.compare(String(password), admin.passwordHash));
    if (!ok) {
      res.status(401).json({ message: "Invalid username or password." });
      return;
    }

    const token = signToken({ id: admin._id.toString(), username: admin.username });
    res.json({
      token,
      user: { id: admin._id.toString(), username: admin.username },
    });
  })
);

router.get(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.user.id).select("username").lean();
    if (!admin) {
      res.status(404).json({ message: "Admin not found." });
      return;
    }
    res.json({ user: { id: admin._id.toString(), username: admin.username } });
  })
);

export { router };
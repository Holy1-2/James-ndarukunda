import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";
import Admin from "./models/Admin.js";
import { router as authRouter } from "./routes/auth.routes.js";
import { router as contactRouter } from "./routes/contact.routes.js";
import { router as eventRouter } from "./routes/event.routes.js";
import { router as galleryRouter } from "./routes/gallery.routes.js";
import { router as siteInfoRouter } from "./routes/siteinfo.routes.js";
import { router as analyticsRouter } from "./routes/analytics.routes.js";
import { notFound, errorHandler } from "./middleware/error.js";
import { UPLOAD_DIR } from "./utils/uploads.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/jaems";
const PORT = Number(process.env.PORT ?? 4000);

async function ensureAdmin() {
  const existing = await Admin.findOne();
  if (existing) {
    console.log("[auth] admin account present");
    return existing;
  }
  const username = process.env.ADMIN_USERNAME ?? "admin";
  const password = process.env.ADMIN_PASSWORD ?? "admin12345";
  const passwordHash = await bcrypt.hash(password, 10);
  const admin = await Admin.create({ username, passwordHash });
  console.log(`[auth] created default admin "${username}"`);
  return admin;
}

async function main() {
  await connectDB(MONGODB_URI);
  await ensureAdmin();

  const app = express();

  const origins = (process.env.CORS_ORIGINS ?? "http://localhost:3000,http://localhost:5173")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);

  app.use(cors({ origin: origins.length ? origins : true }));
  app.use(express.json({ limit: "1mb" }));

  app.use("/uploads", express.static(UPLOAD_DIR));

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", uptime: process.uptime() });
  });

  app.use("/api/auth", authRouter);
  app.use("/api/contacts", contactRouter);
  app.use("/api/events", eventRouter);
  app.use("/api/gallery", galleryRouter);
  app.use("/api/site-info", siteInfoRouter);
  app.use("/api/analytics", analyticsRouter);

  app.use(notFound);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`[server] API running on http://localhost:${PORT}`);
    console.log(`[server] uploads dir: ${UPLOAD_DIR}`);
  });
}

main().catch((err) => {
  console.error("[server] failed to start:", err?.message ?? err);
  process.exit(1);
});
import "dotenv/config";
import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";
import Admin from "./models/Admin.js";

const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/jaems";
const username = process.env.ADMIN_USERNAME ?? "admin";
const password = process.env.ADMIN_PASSWORD ?? "admin12345";

async function seed() {
  await connectDB(MONGODB_URI);

  const existing = await Admin.findOne({ username });
  if (existing) {
    console.log(`[seed] admin "${username}" already exists, skipping.`);
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await Admin.create({ username, passwordHash });
  console.log(`[seed] created admin "${username}".`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("[seed] failed:", err?.message ?? err);
  process.exit(1);
});
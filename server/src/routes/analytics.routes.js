import { Router } from "express";
import Visit from "../models/Visit.js";
import Contact from "../models/Contact.js";
import GalleryImage from "../models/GalleryImage.js";
import Event from "../models/Event.js";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/error.js";

const router = Router();

function todayKey() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

router.post(
  "/visit",
  asyncHandler(async (req, res) => {
    const raw = String(req.body?.path ?? "/").trim();
    const path = raw.startsWith("/") ? raw : `/${raw}`;

    const date = todayKey();
    await Visit.findOneAndUpdate(
      { path, date },
      { $inc: { count: 1 } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(204).end();
  })
);

router.get(
  "/summary",
  requireAuth,
  asyncHandler(async (_req, res) => {
    const sinceKey = todayKey().slice(0, 8) + "01"; // first day of this month

    const [totalAgg, byPathAgg, dailyAgg, totalContacts, unreadContacts, counts] =
      await Promise.all([
        Visit.aggregate([{ $group: { _id: null, total: { $sum: "$count" } } }]),
        Visit.aggregate([
          { $group: { _id: "$path", count: { $sum: "$count" } } },
          { $sort: { count: -1 } },
          { $limit: 10 },
        ]),
        Visit.aggregate([
          { $match: { date: { $gte: sinceKey } } },
          { $group: { _id: "$date", count: { $sum: "$count" } } },
          { $sort: { _id: 1 } },
          { $limit: 31 },
        ]),
        Contact.countDocuments(),
        Contact.countDocuments({ read: false }),
        Promise.all([
          GalleryImage.countDocuments(),
          Event.countDocuments({ published: true, date: { $gte: new Date() } }),
        ]),
      ]);

    res.json({
      summary: {
        totalVisits: totalAgg[0]?.total ?? 0,
        visitsByPath: byPathAgg.map((row) => ({ path: row._id, count: row.count })),
        visitsByDay: dailyAgg.map((row) => ({ date: row._id, count: row.count })),
        totalContacts,
        unreadContacts,
        galleryImages: counts[0],
        upcomingEvents: counts[1],
      },
    });
  })
);

export { router };
import mongoose from "mongoose";

export default async function connectDB(uri) {
  mongoose.set("strictQuery", true);
  const conn = await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 8000,
  });
  console.log(`[db] connected: ${conn.connection.host}/${conn.connection.name}`);
  return conn;
}
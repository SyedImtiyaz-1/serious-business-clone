// Shared MongoDB connection for Vercel serverless functions.
// Caches the mongoose connection on `globalThis` so warm invocations skip the
// 200-300 ms handshake.
const mongoose = require("mongoose");

let cached = globalThis.__mongoCache;
if (!cached) {
  cached = globalThis.__mongoCache = { conn: null, promise: null };
}

async function connect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI is not set");
    cached.promise = mongoose
      .connect(uri, { serverSelectionTimeoutMS: 8000 })
      .then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

const PageContentSchema = new mongoose.Schema(
  {
    page: { type: String, required: true, unique: true, index: true },
    sections: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true, minimize: false }
);

const PageContent =
  mongoose.models.PageContent || mongoose.model("PageContent", PageContentSchema);

module.exports = { connect, PageContent };

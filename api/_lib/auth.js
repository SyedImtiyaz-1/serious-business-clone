// Auth gate: write endpoints require x-admin-key header to match
// process.env.ADMIN_KEY. Reads pass through.
function requireAdmin(req, res) {
  const key = req.headers["x-admin-key"];
  if (!key || key !== process.env.ADMIN_KEY) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}

module.exports = { requireAdmin };

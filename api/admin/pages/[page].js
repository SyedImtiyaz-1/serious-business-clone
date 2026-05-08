const { connect, PageContent } = require("../../_lib/mongo");
const { requireAdmin } = require("../../_lib/auth");

module.exports = async (req, res) => {
  const { page } = req.query;
  if (!page) return res.status(400).json({ error: "Missing page" });

  try {
    await connect();

    if (req.method === "GET") {
      const doc = await PageContent.findOne({ page }).lean();
      return res.json(doc || { page, sections: {} });
    }

    if (req.method === "PUT") {
      if (!requireAdmin(req, res)) return;
      const sections = (req.body && req.body.sections) || {};
      const doc = await PageContent.findOneAndUpdate(
        { page },
        { page, sections },
        { upsert: true, new: true, runValidators: true }
      ).lean();
      return res.json(doc);
    }

    res.setHeader("Allow", "GET, PUT");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

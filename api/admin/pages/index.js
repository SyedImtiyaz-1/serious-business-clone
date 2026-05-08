const { connect, PageContent } = require("../../_lib/mongo");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    await connect();
    const pages = await PageContent.find().sort({ page: 1 }).lean();
    res.json(pages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

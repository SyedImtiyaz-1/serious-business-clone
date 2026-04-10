const mongoose = require("mongoose");

const PageContentSchema = new mongoose.Schema(
  {
    page: { type: String, required: true, unique: true }, // "home", "work", "about", "clients", "services"
    sections: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true, minimize: false }
);

module.exports = mongoose.model("PageContent", PageContentSchema);

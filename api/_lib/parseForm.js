// Multipart form parser for Vercel serverless functions. Uses formidable
// because multer's middleware shape doesn't fit the serverless handler
// signature. Returns { fields, files } where each file has `.filepath`,
// `.originalFilename`, `.mimetype`, etc.
const formidable = require("formidable");

function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    const form = formidable({
      multiples: false,
      maxFileSize: 50 * 1024 * 1024, // 50 MB
    });
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

module.exports = { parseMultipart };

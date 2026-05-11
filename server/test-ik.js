require('dotenv').config();
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});
async function test() {
  try {
    const file = await toFile(Buffer.from("hello"), "test.txt");
    const result = await imagekit.files.upload({
      file,
      fileName: "test.txt",
      folder: "/marshall-admin/images",
      useUniqueFileName: true,
    });
    console.log(result);
  } catch (err) {
    console.error("ERROR:", err);
  }
}
test();

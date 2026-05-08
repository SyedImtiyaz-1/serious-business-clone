// Shared ImageKit client for serverless functions. Lazily constructed on
// first use so missing env vars don't fail at module-load time (CI smoke
// tests, etc.). Cached on globalThis so warm invocations skip re-init.
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

function getClient() {
  if (!globalThis.__imagekitClient) {
    globalThis.__imagekitClient = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });
  }
  return globalThis.__imagekitClient;
}

async function uploadBuffer(buffer, fileName, folder) {
  const client = getClient();
  const file = await toFile(buffer, fileName);
  return client.files.upload({
    file,
    fileName,
    folder,
    useUniqueFileName: true,
  });
}

module.exports = { getClient, uploadBuffer };

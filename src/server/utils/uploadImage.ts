import sharp from "sharp";
import ImageKit from "imagekit";
import { env } from "@/env/server.mjs";

export async function uploadImage(options: {
  filename: string;
  folder: string;
  buffer: Buffer;
  processImage?: (b: sharp.Sharp) => sharp.Sharp;
}) {
  // Instantiate imagekit
  const imagekit = new ImageKit({
    publicKey: env.IMAGEKIT_PUBLIC_KEY,
    privateKey: env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: env.IMAGEKIT_URL_ENDPOINT,
  });

  // Filepath under {folder}/{filename}
  const filepath = [
    options.folder.trim().replace(/\s+/g, "_"),
    options.filename.trim().replace(/\s+/g, "_"),
  ].join("/");

  // Get image buffer with optional sharp processing applied or none.
  const processImage = options.processImage ?? ((_: sharp.Sharp) => _);
  const buffer = await processImage(sharp(options.buffer)).toBuffer();

  // Upload to imagekit.
  const result = await imagekit.upload({
    file: buffer,
    fileName: filepath,
  });

  // Return public URL
  return result.url;
}

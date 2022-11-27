import ImageKit from "imagekit";
import { env } from "../../../env/env.server.mjs";

declare global {
  // eslint-disable-next-line no-var
  var imageKit: ImageKit | undefined;
}

export const imageKit =
  global.imageKit ||
  new ImageKit({
    publicKey: env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
    privateKey: env.IMAGEKIT_PRIVATE_KEY,
  });

if (env.NODE_ENV !== "production") {
  global.imageKit = imageKit;
}

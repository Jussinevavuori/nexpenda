import { NextApiHandler } from "next";
import { imageKit } from "../../../server/context/imageKit";

const handler: NextApiHandler = (req, res) => {
  const auth = imageKit.getAuthenticationParameters();
  return res.json(auth);
};

export default handler;

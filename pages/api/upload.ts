import { NextApiRequest, NextApiResponse } from "next";
import multiparty from "multiparty";
import { mongooseConnect } from "@/lib/mongooseConnect";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await mongooseConnect();
  await isAdminRequest(req, res);

  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    console.log(files.file.length);
    res.json("ok");
  });
}

export const config = {
  api: { bodyParser: false },
};

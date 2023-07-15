import { mongooseConnect } from "@/lib/mongooseConnect";
import { Category } from "@/models/Category";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    res.json(await Category.find());
  }

  if (method === "POST") {
    const { name } = req.body;
    const categoryDoc = await Category.create({ name });
    res.json(categoryDoc);
  }
}

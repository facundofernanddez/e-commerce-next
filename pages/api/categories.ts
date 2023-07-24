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
    res.json(await Category.find().populate("parent"));
  }

  if (method === "POST") {
    const { name, parent, properties } = req.body;
    const categoryDoc = await Category.create({ name, parent, properties });
    res.json(categoryDoc);
  }

  if (method === "PUT") {
    const { name, parent, _id, properties } = req.body;
    const categoryDoc = await Category.updateOne(
      { _id },
      { name, parent, properties }
    );
    res.json(categoryDoc);
  }

  if (method === "DELETE") {
    const { _id } = req.query;
    await Category.deleteOne({ _id });
    res.json("ok");
  }
}

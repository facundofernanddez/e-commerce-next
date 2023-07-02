import { mongooseConnect } from "@/lib/mongooseConnect";
import { Product } from "@/models/Product";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await mongooseConnect();

  if (method === "POST") {
    const { title, description, price } = req.body;

    const productDoc = await Product.create({
      title,
      description,
      price,
    });

    res.json(productDoc);
  }
}

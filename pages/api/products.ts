import { mongooseConnect } from "@/lib/mongooseConnect";
import { Product } from "@/models/Product";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      const id = req.query.id;
      res.json(await Product.findById(id));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === "POST") {
    const { title, description, price } = req.body;

    const productDoc = await Product.create({
      title,
      description,
      price,
    });

    res.json(productDoc);
  }

  if (method === "PUT") {
    const { title, description, price, _id } = req.body;

    await Product.updateOne({ _id }, { title, description, price });

    res.json(true);
  }
}

import { Schema, model } from "mongoose";

const ProductSquema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
});

export const Product = model("product", ProductSquema);

import { Document, Schema, model } from "mongoose";

const ProductSquema: Schema<IProduct> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, trim: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

interface IProduct extends Document {
  title: string;
  description?: string;
  price: number;
}

export const Product = model("product", ProductSquema);

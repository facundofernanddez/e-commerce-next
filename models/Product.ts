import { ICategories } from "@/interfaces/ICategories";
import mongoose, { Document, Schema, model, models } from "mongoose";

const ProductSquema: Schema<IProduct> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, trim: true },
    images: [{ type: String }],
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
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
  images?: string[];
  category?: ICategories;
}

export const Product = models?.product || model("product", ProductSquema);

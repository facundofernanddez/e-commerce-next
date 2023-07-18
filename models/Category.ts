import mongoose from "mongoose";
import { Document, Schema, model, models } from "mongoose";

const CategorySchema: Schema<ICategory> = new Schema(
  {
    name: { type: String, required: true },
    parent: { type: mongoose.Types.ObjectId, ref: "Category" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

interface ICategory extends Document {
  name: string;
  parent?: object;
}

export const Category = models?.Category || model("Category", CategorySchema);

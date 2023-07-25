import { IProperties } from "@/interfaces/IProperties";
import mongoose from "mongoose";
import { Document, Schema, model, models } from "mongoose";

const CategorySchema: Schema<ICategory> = new Schema(
  {
    name: { type: String, required: true },
    parent: { type: mongoose.Types.ObjectId, ref: "Category" },
    properties: [{ type: Object }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

interface ICategory extends Document {
  name: string;
  parent?: ICategory;
  properties?: IProperties[];
}

export const Category = models?.Category || model("Category", CategorySchema);

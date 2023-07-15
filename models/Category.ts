import { Document, Schema, model, models } from "mongoose";

const CategorySchema: Schema<ICategory> = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

interface ICategory extends Document {
  name: string;
}

export const Category = models?.Category || model("Category", CategorySchema);

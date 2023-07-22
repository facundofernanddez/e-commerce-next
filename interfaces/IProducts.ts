import { ICategories } from "./ICategories";

export interface IProducts {
  _id: string;
  title: string;
  description?: string;
  price: number;
  images?: any[];
  category?: ICategories;
}

import { ICategories } from "./ICategories";
import { IProperties } from "./IProperties";

export interface IProducts {
  _id: string;
  title: string;
  description?: string;
  price: number;
  images?: any[];
  category?: ICategories;
  properties?: IProperties;
}

import { IProperties } from "./IProperties";

export interface ICategories {
  _id: string;
  name: string;
  parent?: ICategories;
  properties?: IProperties[];
}

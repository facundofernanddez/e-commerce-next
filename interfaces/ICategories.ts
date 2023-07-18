export interface ICategories {
  _id: string;
  name: string;
  parent?: ICategories;
}

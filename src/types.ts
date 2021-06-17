export type ProductType = {
  _id: string;
  name: string;
  description: string;
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  productTypeId: string;
  purchasePrice: number;
  salePrice: number;
};

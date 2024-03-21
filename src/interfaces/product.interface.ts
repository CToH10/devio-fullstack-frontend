export interface ProductInterface {
  category: string;
  combo: boolean;
  cover_image:string;
  description: string;
  id: string;
  name: string;
  price: number;
}

export interface ProductListObject {
  data: ProductInterface[],
  count: number,
  previousPage: string | undefined;
  nextPage: string | undefined;
}

export interface ProductInterface {
  category: string;
  combo: boolean;
  cover_image: string;
  description: string;
  id: string;
  name: string;
  price: number;
}

export interface ProductListObject {
  data: ProductInterface[];
  count: number;
  previousPage: string | undefined;
  nextPage: string | undefined;
}

export interface OrderType {
  client: string;
  comment: string | null;
  id: string;
  created_at: string | Date;
  updated_at: string | Date;
  products_orders: [
    {
      product: Omit<ProductInterface, 'combo'>;
      quantity: number;
    },
  ];
  priceTotal: number;
  code: number;
  status: string;
}

export interface OrderList {
  count: number;
  data: OrderType[];
}

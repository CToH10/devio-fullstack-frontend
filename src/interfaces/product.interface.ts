export interface ProductInterface {
  category: string;
  combo: boolean;
  cover_image: string;
  description: string;
  id: string;
  name: string;
  price: number;
}

export interface ProductListInterface {
  data: ProductInterface[];
  count: number;
  previousPage: string | undefined;
  nextPage: string | undefined;
}

export interface OrderInterface {
  client: string;
  comment: string | null;
  id: string;
  created_at: string | Date;
  updated_at: string | Date;
  product_orders: [
    {
      product: Omit<ProductInterface, 'combo'>;
      quantity: number;
    },
  ];
  priceTotal: number;
  code: number;
  status: string;
  reason_of_refusal: string | undefined;
}

export interface OrderListInterface {
  count: number;
  data: OrderInterface[];
}

export type RequestOrderInterface = Pick<
  OrderInterface,
  'product_orders' | 'comment'
>;

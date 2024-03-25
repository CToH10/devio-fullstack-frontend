export interface ProductInterface {
  category: string;
  combo: boolean;
  cover_image: string;
  description: string;
  id: string;
  name: string;
  price: number;
}

interface ProductRequestInterface extends ProductInterface {
  comment: string | null;
  additionals?: string | null;
}

export interface ProductListInterface {
  data: ProductInterface[];
  count: number;
  previousPage: string | undefined;
  nextPage: string | undefined;
}

export interface ProductOrderInterface {
  products: ProductRequestInterface;
  quantity: number;
}

export interface OrderInterface {
  client: string;
  id: string;
  created_at: string | Date;
  updated_at: string | Date;
  product_orders: [
    {
      product: Omit<ProductInterface, 'combo'>;
      quantity: number;
      comment: string | null;
      additionals: string;
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

export type RequestOrderInterface = Pick<OrderInterface, 'product_orders'>;

export interface AdditionalItemInterface {
  id: string;
  name: string;
  description: string;
  price: number;
  cover_image: string;
}

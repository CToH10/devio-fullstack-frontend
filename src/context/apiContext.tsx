/* eslint-disable consistent-return */

'use client';

import {
  OrderList,
  OrderType,
  ProductInterface,
  ProductListObject,
} from '@/interfaces/product.interface';
import { api } from '@/service/api';
import { ReactNode, createContext, useContext, useMemo, useState } from 'react';

interface Props {
  children: ReactNode;
}

interface ApiProviderData {
  getAllProducts: (search: string) => Promise<ProductListObject | undefined>;
  productsDisplay: ProductInterface[];
  getCheckoutOrders: () => Promise<OrderList | undefined>;
  checkoutOrders: OrderType[];
}

export const ApiContext = createContext<ApiProviderData>({} as ApiProviderData);

export function ApiProvider({ children }: Props) {
  const [productsDisplay, setProductsDisplay] = useState(
    [] as ProductInterface[],
  );
  const [checkoutOrders, setCheckoutOrders] = useState([] as OrderType[]);

  const getAllProducts = async (
    search: string,
  ): Promise<ProductListObject | undefined> => {
    try {
      const list = await api.get(`products/${search}`);
      setProductsDisplay(list.data.data);

      return list.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getCheckoutOrders = async (): Promise<OrderList | undefined> => {
    try {
      const list = await api.get('orders/checkout');

      setCheckoutOrders(list.data.data);
      return list.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ApiContext.Provider
      value={useMemo(
        () => ({
          getAllProducts,
          productsDisplay,
          checkoutOrders,
          getCheckoutOrders,
        }),
        [getAllProducts, productsDisplay, checkoutOrders, getCheckoutOrders],
      )}
    >
      {children}
    </ApiContext.Provider>
  );
}

export const useApi = () => useContext(ApiContext);

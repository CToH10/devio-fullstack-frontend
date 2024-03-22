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
  getAvailableOrders: () => Promise<OrderList | undefined>;
  checkoutOrders: OrderType[];
  searchParam: string;
  preparing: OrderType[];
  ready: OrderType[];
  orderReady: (id: string) => Promise<void>;
  orderFinished: (id: string) => Promise<void>;
  orderRefused: (id: string, reason?: string | undefined) => Promise<void>;
}

export const ApiContext = createContext<ApiProviderData>({} as ApiProviderData);

export function ApiProvider({ children }: Props) {
  const [productsDisplay, setProductsDisplay] = useState(
    [] as ProductInterface[],
  );
  const [checkoutOrders, setCheckoutOrders] = useState([] as OrderType[]);
  const [searchParam, setSearchParam] = useState('');
  const preparing = checkoutOrders.filter(
    order => order.status === 'preparing',
  );
  const ready = checkoutOrders.filter(order => order.status === 'ready');

  const getAllProducts = async (
    search: string,
  ): Promise<ProductListObject | undefined> => {
    setSearchParam(search);
    try {
      const list = await api.get(`products/${search}`);
      setProductsDisplay(list.data.data);

      return list.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getAvailableOrders = async (): Promise<OrderList | undefined> => {
    try {
      const list = await api.get('orders/checkout');

      setCheckoutOrders(list.data.data);
      return list.data;
    } catch (error) {
      console.error(error);
    }
  };

  const orderReady = async (id: string) => {
    try {
      await api.patch(`orders/${id}`, { status: 'ready' });

      getAvailableOrders();
    } catch (error) {
      console.error(error);
    }
  };

  const orderFinished = async (id: string) => {
    try {
      await api.patch(`orders/${id}`, { status: 'finished' });

      getAvailableOrders();
    } catch (error) {
      console.error(error);
    }
  };

  const orderRefusedd = async (id: string, reason?: string | undefined) => {
    try {
      await api.patch(`orders/${id}`, {
        status: 'ready',
        reason_of_refusal: reason,
      });

      getAvailableOrders();
    } catch (error) {
      console.error(error);
    }
  };
  // not implementing until modal to specify reason if wanted

  return (
    <ApiContext.Provider
      value={useMemo(
        () => ({
          getAllProducts,
          productsDisplay,
          checkoutOrders,
          getAvailableOrders,
          searchParam,
          preparing,
          ready,
          orderReady,
          orderFinished,
          orderRefusedd,
        }),
        [
          getAllProducts,
          productsDisplay,
          checkoutOrders,
          getAvailableOrders,
          searchParam,
          preparing,
          ready,
          orderReady,
          orderFinished,
          orderRefusedd,
        ],
      )}
    >
      {children}
    </ApiContext.Provider>
  );
}

export const useApi = () => useContext(ApiContext);

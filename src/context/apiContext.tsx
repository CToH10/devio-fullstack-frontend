/* eslint-disable consistent-return */

'use client';

import {
  OrderInterface,
  OrderListInterface,
  ProductInterface,
  ProductListInterface,
} from '@/interfaces/product.interface';
import { api } from '@/service/api';
import { ReactNode, createContext, useContext, useMemo, useState } from 'react';

interface Props {
  children: ReactNode;
}

interface ApiProviderData {
  getAllProducts: (search: string) => Promise<ProductListInterface | undefined>;
  productsDisplay: ProductInterface[];
  getAvailableOrders: () => Promise<OrderListInterface | undefined>;
  checkoutOrders: OrderInterface[];
  searchParam: string;
  preparing: OrderInterface[];
  ready: OrderInterface[];
  orderReady: (id: string) => Promise<void>;
  orderFinished: (id: string) => Promise<void>;
  orderRefused: (id: string, reason?: string | undefined) => Promise<void>;
  cart: ProductInterface[];
  addToCart: (product: ProductInterface) => void;
  removeFromCart: (id: string) => void;
  emptyCart: () => void;
}

export const ApiContext = createContext<ApiProviderData>({} as ApiProviderData);

export function ApiProvider({ children }: Props) {
  const [productsDisplay, setProductsDisplay] = useState(
    [] as ProductInterface[],
  );
  const [checkoutOrders, setCheckoutOrders] = useState([] as OrderInterface[]);
  const [searchParam, setSearchParam] = useState('');
  const [cart, setCart] = useState([] as ProductInterface[]);

  const preparing = checkoutOrders.filter(
    order => order.status === 'preparing',
  );
  const ready = checkoutOrders.filter(order => order.status === 'ready');

  const getAllProducts = async (
    search: string,
  ): Promise<ProductListInterface | undefined> => {
    setSearchParam(search);
    try {
      const list = await api.get(`products/${search}`);
      setProductsDisplay(list.data.data);

      return list.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getAvailableOrders = async (): Promise<
    OrderListInterface | undefined
  > => {
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

  const orderRefused = async (id: string, reason?: string | undefined) => {
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

  const addToCart = (product: ProductInterface) => {
    if (!cart.some(prod => prod.id === product.id)) {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (id: string) => {
    const index = cart.findIndex(prod => prod.id === id);

    if (index !== -1) {
      const newCart = cart.toSpliced(index, 1);
      setCart(newCart);
    }
  };

  const emptyCart = () => {
    setCart([]);
  };

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
          orderRefused,
          cart,
          addToCart,
          removeFromCart,
          emptyCart,
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
          orderRefused,
          cart,
          addToCart,
          removeFromCart,
          emptyCart,
        ],
      )}
    >
      {children}
    </ApiContext.Provider>
  );
}

export const useApi = () => useContext(ApiContext);

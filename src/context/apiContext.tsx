/* eslint-disable consistent-return */

'use client';

import { useRouter } from 'next/navigation';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  AdditionalItemInterface,
  OrderInterface,
  OrderListInterface,
  ProductInterface,
  ProductListInterface,
  ProductOrderInterface,
} from '@/interfaces/product.interface';
import {
  OrderUpdateRequestType,
  RefusedOrderType,
} from '@/schema/productOrder.schema';
import { api } from '@/service/api';

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
  orderRefused: (id: string, reason: RefusedOrderType) => Promise<void>;
  cart: ProductOrderInterface[];
  addToCart: (product: ProductOrderInterface) => void;
  removeFromCart: (id: string) => void;
  emptyCart: () => void;
  makeOrder: () => Promise<OrderInterface | undefined>;
  payingOrder: OrderInterface;
  paymentMethod: string;
  money: number;
  setPaymentMethod: Dispatch<SetStateAction<string>>;
  setMoney: Dispatch<SetStateAction<number>>;
  change: number;
  updateOrder: (
    data: OrderUpdateRequestType,
    id: string,
  ) => Promise<OrderInterface | undefined>;
  getAdditionals: () => Promise<AdditionalItemInterface[] | undefined>;
  additionals: AdditionalItemInterface[];
  setPayingOrder: (value: SetStateAction<OrderInterface>) => void;
}

export const ApiContext = createContext<ApiProviderData>({} as ApiProviderData);

export function ApiProvider({ children }: Props) {
  const [productsDisplay, setProductsDisplay] = useState(
    [] as ProductInterface[],
  );
  const [checkoutOrders, setCheckoutOrders] = useState([] as OrderInterface[]);
  const [searchParam, setSearchParam] = useState('');
  const [cart, setCart] = useState([] as ProductOrderInterface[]);
  const [payingOrder, setPayingOrder] = useState({} as OrderInterface);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [money, setMoney] = useState(0);
  const [additionals, setAdditionals] = useState(
    [] as AdditionalItemInterface[],
  );

  const preparing = checkoutOrders.filter(
    order => order.status === 'preparing',
  );
  const ready = checkoutOrders.filter(order => order.status === 'ready');
  const change =
    money > payingOrder.priceTotal ? money - payingOrder.priceTotal : 0;

  const router = useRouter();

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

  const orderRefused = async (id: string, reason: RefusedOrderType) => {
    try {
      await api.patch(`orders/${id}`, {
        status: 'refused',
        ...reason,
      });

      getAvailableOrders();
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = (item: ProductOrderInterface) => {
    const cartProds = cart
      .map(orderObj => orderObj.products)
      .map(cartProd => cartProd.id);

    const itemId = item.products.id;

    if (!cartProds!.some(prod => prod === itemId)) {
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (id: string) => {
    const cartProds = cart
      .map(orderObj => orderObj.products)
      .map(cartProd => cartProd.id);
    const index = cartProds.findIndex(prod => prod === id);

    if (index !== -1) {
      const newCart = cart.toSpliced(index, 1);
      setCart(newCart);
    }
  };

  const emptyCart = (payment?: boolean) => {
    setCart([]);

    if (payment) {
      router.push('/');
    }
  };

  const makeOrder = async () => {
    try {
      const requestBody = {
        products: cart.map(ele => {
          const additionalsObj = ele.products.additionals
            ? [
                ele.products.additionals &&
                  JSON.parse(ele.products.additionals).id,
              ]
            : null;

          return {
            quantity: ele.quantity,
            products_id: ele.products.id,
            additionals: additionalsObj,
          };
        }),
      };

      const order: OrderInterface = await (
        await api.post('/orders', requestBody)
      ).data;

      setPayingOrder(order);

      router.push('/payment');
      emptyCart();
      return order;
    } catch (error) {
      console.error(error);
    }
  };

  const updateOrder = async (
    data: OrderUpdateRequestType,
    id: string,
  ): Promise<OrderInterface | undefined> => {
    try {
      const order = await (await api.patch(`/orders/${id}`, data)).data;

      if (data.status === 'preparing') {
        setPayingOrder(order);
      }

      return order;
    } catch (error) {
      console.error(error);
    }
  };

  const getAdditionals = async (): Promise<
    AdditionalItemInterface[] | undefined
  > => {
    try {
      const addList = await (await api.get('/add')).data;

      setAdditionals(addList);

      return addList;
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
          makeOrder,
          payingOrder,
          paymentMethod,
          money,
          setPaymentMethod,
          setMoney,
          change,
          updateOrder,
          getAdditionals,
          additionals,
          setPayingOrder,
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
          makeOrder,
          payingOrder,
          paymentMethod,
          money,
          setPaymentMethod,
          setMoney,
          change,
          updateOrder,
          getAdditionals,
          additionals,
          setPayingOrder,
        ],
      )}
    >
      {children}
    </ApiContext.Provider>
  );
}

export const useApi = () => useContext(ApiContext);

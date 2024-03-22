'use client';

import { useApi } from '@/context/apiContext';
import { useEffect } from 'react';
import { KitchenCard } from './KitchenCard';

export function KitchenList() {
  const { getAvailableOrders, preparing, ready } = useApi();

  useEffect(() => {
    getAvailableOrders();
  }, []);
  return (
    <section className="w-full flex flex-col gap-3 lg:flex-row justify-between h-full">
      <section className="w-full lg:w-5/12 flex flex-col gap-2 min-h-72 lg:min-h-0 max-h-72 lg:max-h-[90%] overflow-auto scrollbar">
        <h2 className="text-size_4_28 font-bold text-grey-1 sticky top-0 bg-whiteFixed">
          Preparando:
        </h2>
        <ul className="flex flex-col gap-3">
          {preparing.length ? (
            preparing.map(order => (
              <li key={order.id}>
                <KitchenCard
                  client={order.client}
                  code={order.code}
                  comment={order.comment}
                  product_orders={order.product_orders}
                  status={order.status}
                  key={order.id}
                  id={order.id}
                  created_at={order.created_at}
                  priceTotal={order.priceTotal}
                  updated_at={order.updated_at}
                />
              </li>
            ))
          ) : (
            <p className="text-size_1_56 font-bold text-grey-5">
              Nenhum pedido
            </p>
          )}
        </ul>
      </section>
      <div className="border-2 bg-grey-1 rounded-lg h-1 border-grey-1 lg:min-h-[500px] lg:w-[2px] lg:border-none lg:bg-opacity-65" />
      <section className="w-full lg:w-5/12 flex flex-col gap-2 min-h-72 lg:min-h-0 max-h-72 lg:max-h-[90%] overflow-auto scrollbar">
        <h2 className="text-size_4_28 font-bold text-grey-1 sticky top-0 bg-whiteFixed">
          Pronto:
        </h2>
        <ul className="flex flex-col gap-3">
          {ready.length ? (
            ready.map(order => (
              <li key={order.id} className="w-full">
                <KitchenCard
                  client={order.client}
                  code={order.code}
                  comment={order.comment}
                  product_orders={order.product_orders}
                  status={order.status}
                  key={order.id}
                  id={order.id}
                  created_at={order.created_at}
                  priceTotal={order.priceTotal}
                  updated_at={order.updated_at}
                />
              </li>
            ))
          ) : (
            <p className="text-size_1_56 font-bold text-grey-5">
              Nenhum pedido
            </p>
          )}
        </ul>
      </section>
    </section>
  );
}

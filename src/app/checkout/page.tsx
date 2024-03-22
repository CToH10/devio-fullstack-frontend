'use client';

import { useApi } from '@/context/apiContext';
import { useEffect } from 'react';

export default function Checkout() {
  const { checkoutOrders, getCheckoutOrders } = useApi();

  const preparing = checkoutOrders.filter(
    order => order.status === 'preparing',
  );
  const ready = checkoutOrders.filter(order => order.status === 'ready');

  useEffect(() => {
    getCheckoutOrders();
  }, []);

  return (
    <section className="w-full flex flex-col gap-3 lg:flex-row justify-between h-full">
      <section className="w-full lg:w-5/12 flex flex-col gap-2 min-h-72 lg:min-h-0 max-h-72 lg:max-h-[90%] overflow-auto scrollbar">
        <h2 className="text-size_2_36 font-bold text-grey-1 sticky top-0 bg-whiteFixed">
          Preparando:
        </h2>
        <section>
          {preparing.length ? (
            preparing.map(client => (
              <p className="text-size_1_56 font-bold text-grey-5 max-w-full overflow-hidden text-nowrap text-ellipsis">
                {client.client}
              </p>
            ))
          ) : (
            <p className="text-size_1_56 font-bold text-grey-5">
              Nenhum pedido
            </p>
          )}
        </section>
      </section>
      <div className="border-2 bg-grey-1 rounded-lg h-1 border-grey-1 lg:min-h-[500px] lg:w-[5.6px]" />
      <section className="w-full lg:w-5/12 flex flex-col gap-2 min-h-72 lg:min-h-0 max-h-72 lg:max-h-[90%] overflow-auto scrollbar">
        <h2 className="text-size_2_36 font-bold text-grey-1 sticky top-0 bg-whiteFixed">
          Pronto:
        </h2>
        <section>
          {ready.length ? (
            ready.map(client => (
              <p className="text-size_1_56 font-bold text-green-2 max-w-full overflow-hidden text-nowrap text-ellipsis animate-pulse">
                {client.client}
              </p>
            ))
          ) : (
            <p className="text-size_1_56 font-bold text-grey-5">
              Nenhum pedido
            </p>
          )}
        </section>
      </section>
    </section>
  );
}

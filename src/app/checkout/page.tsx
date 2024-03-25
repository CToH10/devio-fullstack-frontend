'use client';

import { useEffect } from 'react';
import { useApi } from '@/context/apiContext';

export default function Checkout() {
  const { getAvailableOrders, preparing, ready } = useApi();

  useEffect(() => {
    getAvailableOrders();
  }, []);

  return (
    <section className="w-full flex flex-col gap-3 lg:flex-row justify-between h-full">
      <section className="w-full lg:w-5/12 flex flex-col gap-2 min-h-72 lg:min-h-0 max-h-72 lg:max-h-[600px] overflow-auto scrollbar lg:scrollbar-none">
        <h2 className="text-size_2_36 font-bold text-grey-1 sticky top-0 bg-whiteFixed z-[120]">
          Preparando:
        </h2>
        <ul>
          {preparing.length ? (
            preparing.map(client => (
              <li key={client.id}>
                <p className="text-size_1_56 font-bold text-grey-5 max-w-full overflow-hidden text-nowrap text-ellipsis">
                  {client.client}
                </p>
              </li>
            ))
          ) : (
            <p className="text-size_1_56 font-bold text-grey-5">
              Nenhum pedido
            </p>
          )}
        </ul>
      </section>
      <div className="border-2 bg-grey-1 rounded-lg h-1 border-grey-1 lg:min-h-[500px] lg:w-[5.6px]" />
      <section className="w-full lg:w-5/12 flex flex-col gap-2 min-h-72 lg:min-h-0 max-h-72 lg:max-h-[600px] overflow-auto scrollbar lg:scrollbar-none">
        <h2 className="text-size_2_36 font-bold text-grey-1 sticky top-0 bg-whiteFixed z-10">
          Pronto:
        </h2>
        <ul>
          {ready.length ? (
            ready.map(client => (
              <li key={client.id}>
                <p className="text-size_1_56 font-bold text-green-2 max-w-full overflow-hidden text-nowrap text-ellipsis animate-pulse ">
                  {client.client}
                </p>
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

'use client';

import { useApi } from '@/context/apiContext';

export function Cart() {
  const { cart, emptyCart } = useApi();

  return (
    <>
      <section className="w-full">
        <p>Empty space for now</p>
      </section>
      <section className="flex flex-col lg:flex-row w-full gap-8 lg:justify-between lg:w-2/3 lg:self-end">
        <button
          type="button"
          className="btn-big btn-green-outline lg:w-5/12"
          disabled={cart.length === 0}
          onClick={() => emptyCart()}
        >
          Cancelar
        </button>
        <button
          type="button"
          className="btn-big btn-green lg:w-5/12"
          disabled={cart.length === 0}
        >
          Finalizar pedido
        </button>
      </section>
    </>
  );
}

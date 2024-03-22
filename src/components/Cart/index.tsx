'use client';

import { useApi } from '@/context/apiContext';

export function Cart() {
  const { cart } = useApi();

  return (
    <>
      <p>{cart.length}</p>
      <section className="flex flex-row w-full gap-8 justify-end">
        <button
          type="button"
          className="btn-big btn-green-outline"
          disabled={cart.length === 0}
        >
          Cancelar
        </button>
        <button
          type="button"
          className="btn-big btn-green"
          disabled={cart.length === 0}
        >
          Finalizar pedido
        </button>
      </section>
    </>
  );
}

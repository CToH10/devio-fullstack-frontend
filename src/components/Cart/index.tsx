'use client';

import { useApi } from '@/context/apiContext';
import { OrderButtons } from '../OrderButtons';

export function Cart() {
  const { cart, emptyCart, makeOrder } = useApi();

  return (
    <>
      <section className="w-full">
        <p>Empty space for now</p>
      </section>
      <OrderButtons
        disabled={cart.length === 0}
        onClickCancel={emptyCart}
        onClickConfirm={makeOrder}
      />
    </>
  );
}

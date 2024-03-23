'use client';

import { useApi } from '@/context/apiContext';
import { CartDetails } from '../CartDetails';
import { OrderButtons } from '../OrderButtons';

export function Cart() {
  const { cart, emptyCart, makeOrder } = useApi();

  return (
    <>
      <section className="w-full">{cart.length > 0 && <CartDetails />}</section>
      <OrderButtons
        disabled={cart.length === 0}
        onClickCancel={emptyCart}
        onClickConfirm={makeOrder}
      />
    </>
  );
}

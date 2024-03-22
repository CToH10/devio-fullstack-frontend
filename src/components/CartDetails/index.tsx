'use client';

import { useApi } from '@/context/apiContext';

export function CartDetails() {
  const { cart } = useApi();

  const total = cart.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <section>
      <section className="items">
        <p>{total}</p>
      </section>
      <section className="total">
        <p>Total do pedido</p>
        <p>
          {total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
      </section>
    </section>
  );
}

'use client';

import { usePathname } from 'next/navigation';
import { useApi } from '@/context/apiContext';
import { CartOrderItem } from './OrderItem';

export function CartDetails() {
  const { cart, payingOrder } = useApi();
  const pathname = usePathname();

  const cartAdd =
    cart &&
    cart
      .map((item, i) => {
        if (
          item.products.additionals &&
          JSON.parse(item.products.additionals)
        ) {
          const cartQuant = cart[i].quantity;
          const addPrice = JSON.parse(item.products.additionals).price;
          return {
            price: cartQuant * addPrice,
          };
        }
        return { price: 0 };
      })
      .reduce((acc, curr) => acc + curr.price, 0);

  const total =
    pathname === '/payment'
      ? payingOrder.priceTotal
      : cart.reduce(
          (acc, curr) => acc + curr.products.price * curr.quantity,
          0,
        ) + cartAdd;

  return (
    <section
      className={`border-2 border-grey-5 border-opacity-40 rounded px-12 py-3 w-full ${pathname === '/payment' ? 'max-w-96' : ''} flex flex-col gap-1`}
    >
      <section className="items">
        <ul>
          {pathname === '/payment'
            ? payingOrder.product_orders.map(order => (
                <CartOrderItem
                  id={order.product.id}
                  key={order.product.id}
                  name={order.product.name}
                  price={order.product.price}
                  quantity={order.quantity}
                  comment={order.comment}
                  additionals={JSON.stringify(order.additionals[0])}
                />
              ))
            : cart.map(cartItem => (
                <CartOrderItem
                  key={cartItem.products.id}
                  id={cartItem.products.id}
                  name={cartItem.products.name}
                  price={cartItem.products.price}
                  quantity={cartItem.quantity}
                  comment={cartItem.products.comment}
                  additionals={cartItem.products.additionals}
                />
              ))}
        </ul>
      </section>
      <hr className="border-t border-dashed border-grey-4 border-opacity-40" />
      <section className="flex justify-between items-center py-1">
        <p className="text-size_7_16 font-normal text-grey-1">
          Total do pedido:
        </p>
        <p className="text-size_4_28 font-bold text-grey-1">
          {total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
      </section>
    </section>
  );
}

'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { Modal } from '@/components/Modal';
import { useApi } from '@/context/apiContext';
import { ProductInterface } from '@/interfaces/interface';
import { ProductConfirm } from './ProductConfirm';

export function ProductCard({
  cover_image: image,
  description,
  id,
  name,
  price,
  category,
  combo,
}: ProductInterface) {
  const { addToCart, cart, removeFromCart } = useApi();
  const inCart = cart
    .map(orderObj => orderObj.products)
    .map(cartProd => cartProd.id)
    .some(cartId => cartId === id);

  const productOrder = {
    products: {
      cover_image: image,
      description,
      id,
      name,
      price,
      category,
      combo,
    },
    quantity: 1,
  };
  const [show, setShow] = useState(false);

  return (
    <>
      <li
        key={id}
        className="h-64 shadow flex flex-col items-center rounded-xl product-card w-52 max-w-52 md:m-auto lg:m-0 relative"
      >
        <button
          type="button"
          className="h-64 flex flex-col items-center rounded-xl w-52 max-w-52 md:m-auto lg:m-0"
          onClick={() => setShow(true)}
        >
          <section className="w-full max-h-24 h-24 rounded-t-xl">
            <figure className="w-full h-full relative object-contain flex text-center rounded-t-xl">
              <Image
                src={image}
                alt={description}
                aria-label={description}
                width={110}
                height={110}
                className="object-cover m-auto self-center mt-7 relative z-30"
              />
              <figcaption className="hidden">{description}</figcaption>
            </figure>
          </section>
          <section className="bg-whiteFixed rounded-t-lg w-full flex flex-col items-center justify-center h-40 px-3 relative">
            <section className="flex flex-col justify-between items-center w-full">
              <p className="font-semibold text-grey-1 text-size_6_20 max-w-full text-nowrap overflow-hidden text-ellipsis">
                {name}
              </p>
              <p className="font-normal text-grey-2 text-size_8_14 max-w-full text-nowrap overflow-hidden text-ellipsis">
                {description.split(', ')[0]}
              </p>
            </section>
            <p className="font-semibold text-grey-1 text-size_6_20 absolute bottom-2">
              {price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
          </section>
        </button>
        {inCart && (
          <button
            type="button"
            className="h-full w-full rounded-xl absolute top-0 left-0 z-50 bg-green-3 bg-opacity-55 backdrop-blur-[1px]"
            onClick={() => removeFromCart(id)}
          >
            <FaCheck
              color="white"
              className="relative top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10"
            />
          </button>
        )}
      </li>
      {show && (
        <Modal title="Revise seu pedido!" onClose={() => setShow(false)}>
          <ProductConfirm
            name={name}
            category={category}
            price={price}
            description={description}
            cover_image={image}
            id={id}
            combo={combo}
            key={id}
            onClose={() => setShow(false)}
          />
        </Modal>
      )}
    </>
  );
}

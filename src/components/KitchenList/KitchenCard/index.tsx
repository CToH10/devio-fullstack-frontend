'use client';

import { Modal } from '@/components/Modal';
import { RefuseOrder } from '@/components/RefuseOrder';
import { useApi } from '@/context/apiContext';
import { OrderInterface } from '@/interfaces/product.interface';
import Image from 'next/image';
import { useState } from 'react';
import { FaCheck, FaX } from 'react-icons/fa6';

export function KitchenCard({
  client,
  code,
  id,
  status,
  product_orders: productOrderList,
}: OrderInterface) {
  const { orderReady, orderFinished, orderRefused } = useApi();
  const [show, setShow] = useState(false);

  return (
    <>
      <section
        className={`flex justify-between items-center w-full shadow p-3 rounded-xl border-opacity-35 ${status === 'ready' && 'border-2 border-green-3 shadow-md'}`}
      >
        <section className="shadow">
          <Image
            src={productOrderList[0].product.cover_image}
            alt={productOrderList[0].product.name}
            height={60}
            width={60}
            className="w-full object-contain aspect-[3/2] mix-blend-color-burn"
          />
        </section>
        <section className="w-[55%] flex flex-col h-full">
          <p className="text-size_7_16 text-grey-1 font-bold">{`${code} - ${client}`}</p>
          <span className="text-size_9_12 text-grey-7 font-normal">{`${productOrderList[0].quantity} x ${productOrderList[0].product.name}`}</span>
        </section>
        <section className="flex flex-row gap-2 items-center justify-center">
          {status === 'ready' ? (
            <button
              type="button"
              className="btn-small btn-red-light"
              onClick={() => orderFinished(id)}
            >
              <FaX />
            </button>
          ) : (
            <>
              <button
                type="button"
                className="btn-small btn-red-light"
                onClick={() => setShow(true)}
              >
                <FaX />
              </button>
              <button
                type="button"
                className="btn-small btn-green-light"
                onClick={() => orderReady(id)}
              >
                <FaCheck />
              </button>
            </>
          )}
        </section>
      </section>
      {status !== 'ready' && productOrderList.some(prod => prod.comment) && (
        <section className="p-3 flex flex-col gap-2">
          <h5 className="text-size_8_14 font-bold text-grey-1">Observações:</h5>{' '}
          {productOrderList.map(
            prodOrder =>
              prodOrder.comment && (
                <p
                  className="text-size_9_12 px-5 py-2 border-2 border-grey-2 border-opacity-50 rounded"
                  key={prodOrder.product.id}
                >
                  {prodOrder.product.name} - {prodOrder.comment}
                </p>
              ),
          )}
        </section>
      )}
      {show && (
        <Modal title="Motivo para recusar?" onClose={() => setShow(false)}>
          <RefuseOrder
            id={id}
            onClose={() => setShow(false)}
          />
        </Modal>
      )}
    </>
  );
}

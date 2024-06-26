'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaWallet } from 'react-icons/fa6';
import { CartDetails } from '@/components/CartDetails';
import { ClientInput } from '@/components/ClientInput';
import { Modal } from '@/components/Modal';
import { OrderButtons } from '@/components/OrderButtons';
import { PaymentArea } from '@/components/PaymentArea';
import { useApi } from '@/context/apiContext';
import {
  OrderUpdateRequestType,
  updateOrderSchema,
} from '@/schema/productOrder.schema';

export function PaymentStructure() {
  const { emptyCart, payingOrder, updateOrder } = useApi();
  const [show, setShow] = useState(false);

  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<OrderUpdateRequestType>({
    resolver: zodResolver(updateOrderSchema),
    mode: 'onBlur',
    defaultValues: {
      status: 'preparing',
    },
  });

  const paymentEmpty = () => {
    updateOrder(
      { status: 'refused', client: payingOrder.client },
      payingOrder.id,
    );
    emptyCart();
    router.push('/');
  };

  const onSubmit = async (data: OrderUpdateRequestType) => {
    await updateOrder(data, payingOrder.id);
    emptyCart();
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
    router.push('/');
  };
  return (
    <>
      <section className="w-full lg:grid grid-cols-2 gap-y-5">
        <section className="flex gap-5 items-center col-span-2 mb-3 lg:mb-0">
          <span>
            <FaWallet className="text-green-2 text-size_7_16" />
          </span>
          <h2 className="text-size_5_24 font-bold text-grey-1">Pagamento</h2>
        </section>
        <section className="w-full mb-3 lg:mb-0">
          <section>
            <h3 className="text-size_7_16 font-bold text-grey-1 mb-2">
              Resumo da compra
            </h3>
            <CartDetails />
            <ClientInput
              error={errors.client?.message}
              register={register('client')}
              code={payingOrder.code}
            />
          </section>
        </section>
        <section className="w-full mb-3 lg:mb-0">
          <h3 className="text-size_7_16 font-bold text-grey-1 mb-2">
            Selecione a forma de pagamento
          </h3>
          <PaymentArea />
        </section>
        <section className="col-[2] w-full">
          <OrderButtons
            onClickCancel={paymentEmpty}
            onClickConfirm={handleSubmit(onSubmit)}
          />
        </section>
      </section>
      {show && (
        <Modal
          title="Seu pedido foi realizado com sucesso!"
          onClose={() => closeModal()}
        >
          <section className="w-full flex flex-col gap-5 lg:items-center">
            <p className="text-size_7_16 text-grey-1 font-semibold">
              O pedido foi encaminhado para a cozinha
            </p>
            <p className="text-size_7_16 text-grey-2 font-normal">
              Imprimir nota?
            </p>
            <section className="flex flex-col lg:flex-row gap-1 lg:gap-5">
              <button
                type="button"
                className="btn-big btn-red-light"
                onClick={() => closeModal()}
              >
                Fechar
              </button>
              <button
                type="button"
                className="btn-big btn-green"
                onClick={() => router.push('/payment/receipt')}
              >
                Imprimir
              </button>
            </section>
          </section>
        </Modal>
      )}
    </>
  );
}

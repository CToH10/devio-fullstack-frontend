'use client';

import { CartDetails } from '@/components/CartDetails';
import { ClientInput } from '@/components/ClientInput';
import { Modal } from '@/components/Modal';
import { OrderButtons } from '@/components/OrderButtons';
import { PaymentArea } from '@/components/PaymentArea';
import { useApi } from '@/context/apiContext';
import { PrinterComponent } from '@/components/print';
import { queryClient } from '@/components/print/queryClient';
import {
  OrderUpdateRequestType,
  updateOrderSchema,
} from '@/schema/productOrder.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaWallet } from 'react-icons/fa6';

export default function Payment() {
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

  const onSubmit = (data: OrderUpdateRequestType) => {
    updateOrder(data, payingOrder.id);
    emptyCart();
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
    router.push('/checkout');
  };
  return (
    <QueryClientProvider client={queryClient}>
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
          title="Pedido finalizado com sucesso!"
          onClose={() => closeModal()}
        >
          <p>O pedido foi encaminhado para a cozinha</p>
        </Modal>
      )}
      <PrinterComponent />
    </QueryClientProvider>
  );
}

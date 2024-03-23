'use client';

import { CartDetails } from '@/components/CartDetails';
import { Modal } from '@/components/Modal';
import { OrderButtons } from '@/components/OrderButtons';
import { PaymentArea } from '@/components/PaymentArea';
import { useApi } from '@/context/apiContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaWallet } from 'react-icons/fa6';

export default function Payment() {
  const { getAvailableOrders, emptyCart } = useApi();
  const router = useRouter();
  const [show, setShow] = useState(false);

  const paymentEmpty = () => {
    emptyCart();
    router.push('/');
  };

  const confirmPurchase = () => {
    getAvailableOrders();
    emptyCart();
    setShow(true);
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
            onClickConfirm={confirmPurchase}
          />
        </section>
      </section>
      {show && (
        <Modal
          title="Pedido finalizado com sucesso!"
          onClose={() => setShow(false)}
        >
          <p>O pedido foi encaminhado para a cozinha</p>
        </Modal>
      )}
    </>
  );
}

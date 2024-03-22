'use client';

import { CartDetails } from '@/components/CartDetails';
import { OrderButtons } from '@/components/OrderButtons';
import { useApi } from '@/context/apiContext';
import { useRouter } from 'next/navigation';
import { FaWallet } from 'react-icons/fa6';

export default function Payment() {
  const { getAvailableOrders, emptyCart } = useApi();
  const router = useRouter();

  const paymentEmpty = () => {
    emptyCart();
    router.push('/');
  };

  return (
    <section className="w-full">
      <section>
        <section className="flex gap-5 items-center">
          <span>
            <FaWallet className="text-green-2 text-size_7_16" />
          </span>
          <h2 className="text-size_5_24 font-bold text-grey-1">Pagamento</h2>
        </section>
        <section>
          <h3 className="text-size_7_16 font-bold text-grey-1">
            Resumo da compra
          </h3>
          <CartDetails />
        </section>
      </section>
      <section>
        <h3 className="text-size_7_16 font-bold text-grey-1">
          Selecione a forma de pagamento
        </h3>
        {/* input radio for payment */}
      </section>
      <OrderButtons
        onClickCancel={paymentEmpty}
        onClickConfirm={getAvailableOrders}
      />
    </section>
  );
}

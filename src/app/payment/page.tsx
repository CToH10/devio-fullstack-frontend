'use client';

import { redirect } from 'next/navigation';
import { PaymentStructure } from '@/components/PaymentStructure';
import { useApi } from '@/context/apiContext';

export default function Payment() {
  const { payingOrder } = useApi();
  return payingOrder.product_orders !== undefined ? (
    <>
      <PaymentStructure />;
    </>
  ) : (
    redirect('/')
  );
}

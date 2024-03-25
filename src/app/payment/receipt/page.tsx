'use client';

import { redirect } from 'next/navigation';
import { PrinterComponent } from '@/components/print';
import { useApi } from '@/context/apiContext';

export default function Receipt() {
  const { payingOrder } = useApi();
  return payingOrder.product_orders !== undefined ? (
    <PrinterComponent />
  ) : (
    redirect('/')
  );
}

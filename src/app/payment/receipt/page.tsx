'use client';

import { PrinterComponent } from '@/components/print';
import { useApi } from '@/context/apiContext';
import { redirect } from 'next/navigation';

export default function Receipt() {
  const { payingOrder } = useApi();
  return payingOrder.product_orders !== undefined ? (
    <PrinterComponent />
  ) : (
    redirect('/')
  );
}

'use client';

import { redirect } from 'next/navigation';
import { PaymentStructure } from '@/components/PaymentStructure';
// import { queryClient } from '@/components/print/queryClient';
import { useApi } from '@/context/apiContext';
// import { QueryClientProvider } from '@tanstack/react-query';

// comments are library recommended way of connecting to printer

export default function Payment() {
  const { payingOrder } = useApi();
  return payingOrder.product_orders !== undefined ? (
    // <QueryClientProvider client={queryClient}>
    <PaymentStructure />
  ) : (
    // </QueryClientProvider>
    redirect('/')
  );
}

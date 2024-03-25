'use client';

import { PaymentStructure } from '@/components/PaymentStructure';
import { redirect } from 'next/navigation';
// import { queryClient } from '@/components/print/queryClient';
import { useApi } from '@/context/apiContext';
// import { QueryClientProvider } from '@tanstack/react-query';

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

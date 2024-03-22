'use client';

import { useApi } from '@/context/apiContext';
import { useEffect } from 'react';

export function Checkout() {
  const { checkoutOrders, getCheckoutOrders } = useApi();

  useEffect(() => {
    getCheckoutOrders();
  }, []);

}

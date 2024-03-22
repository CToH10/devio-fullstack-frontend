'use client';

import { useApi } from '@/context/apiContext';

export function Cart() {
  const { cart } = useApi();

  return <p>{cart.length}</p>;
}

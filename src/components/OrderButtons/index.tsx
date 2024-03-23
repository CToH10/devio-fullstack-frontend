'use client';

import { useApi } from '@/context/apiContext';
import { usePathname } from 'next/navigation';

interface OrderProps {
  disabled?: boolean;
  onClickCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickConfirm: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function OrderButtons({
  disabled,
  onClickCancel,
  onClickConfirm,
}: OrderProps) {
  const { money, payingOrder, paymentMethod } = useApi();
  const pathname = usePathname();
  const isDisabled =
    (money < payingOrder.priceTotal && paymentMethod === 'cash') ||
    paymentMethod === '';

  const className =
    pathname === '/payment'
      ? 'flex flex-col lg:flex-row w-full gap-8 lg:justify-between lg:content'
      : 'flex flex-col lg:flex-row w-full gap-8 lg:justify-between lg:w-2/3 lg:self-end';

  return (
    <section className={className}>
      <button
        type="button"
        className="btn-big btn-green-outline lg:w-5/12"
        disabled={disabled}
        onClick={e => onClickCancel(e)}
      >
        Cancelar
      </button>
      <button
        type="button"
        className="btn-big btn-green lg:w-5/12"
        disabled={pathname === '/payment' ? isDisabled : disabled}
        onClick={e => onClickConfirm(e)}
      >
        Finalizar pedido
      </button>
    </section>
  );
}

'use client';


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
  return (
    <section className="flex flex-col lg:flex-row w-full gap-8 lg:justify-between lg:w-2/3 lg:self-end">
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
        disabled={disabled}
        onClick={e => onClickConfirm(e)}
      >
        Finalizar pedido
      </button>
    </section>
  );
}

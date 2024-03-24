import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useApi } from '@/context/apiContext';
import {
  RefusedOrderType,
  refuseOrderSchema,
} from '@/schema/productOrder.schema';

interface Props {
  onClose: () => void;
  id: string;
}

export function RefuseOrder({ id, onClose }: Props) {
  const { orderRefused } = useApi();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RefusedOrderType>({
    resolver: zodResolver(refuseOrderSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: RefusedOrderType) => {
    orderRefused(id, data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center gap-3 w-full"
    >
      <label
        htmlFor="reason_of_refusal"
        className="text-size_7_16 text-grey-1 font-semibold flex flex-col gap-2 w-full lg:w-4/5"
      >
        Motivo
        <input
          type="text"
          id="reason_of_refusal"
          placeholder="Razão"
          {...register('reason_of_refusal')}
          className="w-full"
        />
        {errors && (
          <span className="error">{errors.reason_of_refusal?.message}</span>
        )}
      </label>
      <section className="w-full flex flex-col gap-2 lg:flex-row lg:w-4/5 lg:justify-end">
        <button
          type="button"
          className="btn-big btn-green-outline"
          onClick={() => onClose()}
        >
          Cancelar
        </button>
        <button type="submit" className="btn-big btn-red-light">
          Recusar pedido
        </button>
      </section>
    </form>
  );
}

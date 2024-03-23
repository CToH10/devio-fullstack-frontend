import { useApi } from '@/context/apiContext';
import {
  RefusedOrderType,
  refuseOrderSchema,
} from '@/schema/productOrder.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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
        className="text-size_7_16 text-grey-1 font-semibold flex flex-col gap-2 w-4/5"
      >
        Motivo
        <input
          type="text"
          id="reason_of_refusal"
          placeholder="Razão"
          {...register('reason_of_refusal')}
        />
        {errors && (
          <span className="error">{errors.reason_of_refusal?.message}</span>
        )}
      </label>
      <section className="w-4/5 flex flex-col gap-2 lg:flex-row">
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

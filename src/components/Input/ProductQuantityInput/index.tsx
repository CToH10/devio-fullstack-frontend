import { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  register?: UseFormRegisterReturn;

  error?: string;
}

export function ProductQuantityInput({ register, error }: Props) {
  return (
    <div className="relative flex flex-col items-center max-w-[8rem]">
      <input
        {...register}
        type="number"
        id="quantity-input"
        className="block w-full py-2.5 h-9 relative z-0 rounded-3xl pl-14 border-green-2"
        step={1}
        min={1}
        max={20}
        defaultValue={1}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
}

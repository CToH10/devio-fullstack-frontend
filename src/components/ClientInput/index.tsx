import { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  register?: UseFormRegisterReturn;

  error?: string;
}

export function ClientInput({ error, register }: Props) {
  return (
    <section className="flex flex-col w-full max-w-96 lg:flex-row lg:justify-between lg:mt-2">
      <fieldset className="w-full lg:w-8/12">
        <label
          htmlFor="clientInput"
          className="flex flex-col w-full text-grey-1 font-bold text-size_7_16"
        >
          Nome do cliente
          <input
            {...register}
            type="text"
            className="w-full"
            id="clientInput"
            placeholder="Primeiro nome"
          />
        </label>
        {error && <span className="error">{error}</span>}
      </fieldset>
      <fieldset className="w-full lg:w-3/12">
        <label
          htmlFor="code"
          className="flex flex-col w-full text-grey-1 font-bold text-size_7_16"
        >
          Código
          <input type="text" className="w-full" id="code" disabled />
        </label>
      </fieldset>
    </section>
  );
}

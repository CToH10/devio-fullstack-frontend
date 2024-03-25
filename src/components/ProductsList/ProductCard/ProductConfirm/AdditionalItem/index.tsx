import Image from 'next/image';
import { UseFormRegisterReturn } from 'react-hook-form';
import { AdditionalItemInterface } from '@/interfaces/product.interface';

interface Props {
  addList: AdditionalItemInterface[];
  register?: UseFormRegisterReturn;
}

export function AdditionalItems({ addList, register }: Props) {
  return (
    <section className="flex flex-col gap-3">
      {addList.map(add => {
        return (
          <section
            className="flex items-center px-3 py-1 rounded-lg w-full shadow lg:px-5 lg:py-3 hover:shadow-lg"
            key={add.id}
          >
            <label
              htmlFor={add.id}
              className="text-size_6_20 font-semibold  flex justify-between items-center w-full"
            >
              <section className="flex gap-2">
                <Image
                  src={add.cover_image}
                  alt={add.name}
                  width={70}
                  height={70}
                  className="hidden lg:block shadow"
                />
                <section className="flex flex-col gap-1">
                  <span className="text-size_7_16 text-grey-1 font-bold">
                    {add.name}
                  </span>
                  <span className="text-size_9_12 text-grey-2 font-normal">
                    {add.description}
                  </span>
                </section>
              </section>
              <section className="min-w-12 flex items-center gap-5 lg:gap-10">
                <span className="text-size_7_16   font-semibold text-grey-5">
                  {add.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
                <input
                  type="radio"
                  className="accent-green-2"
                  id={add.id}
                  name={add.name}
                  value={JSON.stringify(add)}
                  {...register}
                />
              </section>
            </label>
          </section>
        );
      })}
    </section>
  );
}

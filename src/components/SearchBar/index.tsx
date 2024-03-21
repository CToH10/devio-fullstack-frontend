'use client';

import { useApi } from '@/context/apiContext';
import { Field } from '../Field';

export function SearchBar() {
  const { getAllProducts } = useApi();
  return (
    <section className="searchBar flex flex-col gap-4 w-full max-w-72 md:max-w-96 lg:self-start">
      <Field
        id="search"
        label="Seja bem vindo!"
        placeholder="O que você procura?"
        labelClass="text-size_3_32"
        onChange={e => console.log(getAllProducts(e.target.value))}
      />
    </section>
  );
}

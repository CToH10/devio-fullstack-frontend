'use client';

import { useApi } from '@/context/apiContext';
import { useState } from 'react';

export function CategoryCard({
  name,
  image,
}: {
  name: string;
  image: JSX.Element;
}) {
  const { getAllProducts, searchParam } = useApi();
  const [active, setActive] = useState(false);

  function translate(category: string): string {
    switch (category) {
      case 'drink':
        return 'Bebidas';
        break;
      case 'dessert':
        return 'Sobremesas';
        break;
      case 'side':
        return 'Acompanhamentos';
        break;
      default:
        return 'Combos';
    }
  }

  return (
    <li
      className={`categoryCard ${searchParam === name ? 'active-card' : ''}`}
      key={name}
    >
      <button
        type="button"
        className="flex flex-row-reverse gap-3 items-center justify-around bg-whiteFixed h-16 w-44 min-w-44 px-3 rounded-lg shadow-md"
        onClick={() => {
          if (active && searchParam === name) {
            getAllProducts('');
            setActive(false);
          } else {
            getAllProducts(name);
            setActive(true);
          }
        }}
      >
        {image}
        <p className="min-w-[79%] max-w-[79%] overflow-hidden text-nowrap text-ellipsis pt-1 font-semibold text-size_7_16">
          {translate(name)}
        </p>
      </button>
    </li>
  );
}

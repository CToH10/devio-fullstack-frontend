// 'use client';

import { useApi } from '@/context/apiContext';

export function CategoryCard({
  name,
  image,
}: {
  name: string;
  image: JSX.Element;
}) {
  const { getAllProducts } = useApi();

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
    <li className="categoryCard" key={name}>
      <button
        type="button"
        className="flex flex-row-reverse gap-3 items-center justify-around bg-whiteFixed h-16 w-44 min-w-44 px-3 rounded-lg shadow-md"
        onClick={() => getAllProducts(name)}
      >
        {image}
        <p className="min-w-[79%] max-w-[79%] overflow-hidden text-nowrap text-ellipsis pt-1 font-semibold text-size_7_16">
          {translate(name)}
        </p>
      </button>
    </li>
  );
}

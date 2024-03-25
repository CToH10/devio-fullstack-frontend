'use client';

import { GiFrenchFries } from 'react-icons/gi';
import { IoFastFoodOutline, IoIceCreamOutline } from 'react-icons/io5';
import { LuCupSoda } from 'react-icons/lu';
import { TitleDescriptionSection } from '../TitleDescSect';
import { CategoryCard } from './CategoryCard';

const categoriesList = [
  {
    name: 'drink',
    image: (
      <LuCupSoda
        preserveAspectRatio="xMaxYMid"
        style={{
          width: '40px',
          height: '40px',
        }}
      />
    ),
  },
  {
    name: 'combo',
    image: (
      <IoFastFoodOutline
        preserveAspectRatio="xMaxYMid"
        style={{
          width: '40px',
          height: '40px',
        }}
      />
    ),
  },
  {
    name: 'dessert',
    image: (
      <IoIceCreamOutline
        preserveAspectRatio="xMaxYMid"
        style={{
          width: '40px',
          height: '40px',
        }}
      />
    ),
  },
  {
    name: 'side',
    image: (
      <GiFrenchFries
        preserveAspectRatio="xMaxYMid"
        style={{
          width: '40px',
          height: '40px',
        }}
      />
    ),
  },
];

export function Categories() {
  return (
    <section className="categoriesSection w-full">
      <TitleDescriptionSection
        title="Categorias"
        description="Navegue por categorias"
      />
      <ul className="categoriesSection w-full max-w-full flex flex-row gap-7 overflow-auto scrollbar py-3 px-1 lg:grid grid-cols-2 grid-rows-2 lg:gap-0 lg:gap-y-8 lg:place-items-center mt-3">
        {categoriesList.map(category => CategoryCard(category))}
      </ul>
    </section>
  );
}

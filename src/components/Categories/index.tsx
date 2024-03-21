import { GiFrenchFries } from 'react-icons/gi';
import { IoFastFoodOutline, IoIceCreamOutline } from 'react-icons/io5';
import { LuCupSoda } from 'react-icons/lu';
import { CategoryCard } from './CategoryCard';

const categoriesList = [
  { name: 'drink', image: <LuCupSoda /> },
  { name: 'combo', image: <IoFastFoodOutline /> },
  { name: 'dessert', image: <IoIceCreamOutline /> },
  { name: 'side', image: <GiFrenchFries /> },
];

export function Categories() {
  return (
    <section className="categoriesSection w-4/5 max-w-[80%] bg-red-2 flex flex-row gap-7 overflow-auto scrollbar">
      {categoriesList.map(category => CategoryCard(category))}
    </section>
  );
}

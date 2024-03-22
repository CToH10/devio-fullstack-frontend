import { Cart } from '@/components/Cart';
import { Categories } from '@/components/Categories';
import { ProductsList } from '@/components/ProductsList';
import { SearchBar } from '@/components/SearchBar';

export default function Home() {
  return (
    <>
      <SearchBar />
      <Categories />
      <ProductsList />
      <Cart />
    </>
  );
}

'use client';

import { useApi } from '@/context/apiContext';
import { OrderInterface } from '@/interfaces/product.interface';
import { useEffect } from 'react';
import { TitleDescriptionSection } from '../TitleDescSect';
import { ProductCard } from './ProductCard';

export function ProductsList() {
  const {
    productsDisplay,
    getAllProducts,
    setMoney,
    setPayingOrder,
    setPaymentMethod,
  } = useApi();

  useEffect(() => {
    getAllProducts('');
    setMoney(0);
    setPaymentMethod('');
    setPayingOrder({} as OrderInterface);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="w-full">
      <TitleDescriptionSection
        title="Produtos"
        description="Selecione um produto para adicionar ao seu pedido"
      />
      <ul className="productsListing mt-3 w-full flex flex-col gap-4 items-center md:grid md:grid-cols-2 lg:grid-cols-3P xl:grid-cols-4P lg:justify-between max-h-96 overflow-auto scrollbar lg:max-h-full">
        {productsDisplay.map(product => (
          <ProductCard
            name={product.name}
            category={product.category}
            price={product.price}
            description={product.description}
            cover_image={product.cover_image}
            id={product.id}
            combo={product.combo}
            key={product.id}
          />
        ))}
      </ul>
    </section>
  );
}

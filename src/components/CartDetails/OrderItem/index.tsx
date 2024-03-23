export function CartOrderItem({
  id,
  name,
  price,
  quantity,
}: {
  id: string;
  name: string;
  quantity: number;
  price: number;
}) {
  return (
    <li key={id} className="flex justify-between items-center py-2">
      <section className="w-full">
        <p className="text-size_7_16 font-normal text-grey-1 w-[80%]">
          {quantity}x {name}
        </p>
      </section>
      <section>
        <p className="text-size_7_16 font-normal text-grey-1 w-[27%]">
          {price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
      </section>
    </li>
  );
}

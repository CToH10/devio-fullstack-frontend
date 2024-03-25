export function CartOrderItem({
  id,
  name,
  price,
  quantity,
  comment,
  additionals,
}: {
  id: string;
  name: string;
  quantity: number;
  price: number;
  comment?: string | null;
  additionals?: string | null | undefined;
}) {
  const add = additionals && JSON.parse(additionals);

  const itemTotal = add
    ? add.price + price || add.additional.price + price
    : price;

  return (
    <li key={id} className="flex justify-between items-center py-2">
      <section className="w-full">
        <p className="text-size_7_16 font-normal text-grey-1 w-[80%]">
          {quantity}x {name}
        </p>
        <p className="text-size_9_12 font-light text-grey-3 w-[80%] overflow-hidden text-ellipsis text-nowrap">
          {comment}
        </p>
        {additionals && (
          <p className="text-size_9_12 font-light text-grey-3 w-[80%] overflow-hidden text-ellipsis text-nowrap">
            + {add.name || add.additional.name}
          </p>
        )}
      </section>
      <section>
        <p className="text-size_7_16 font-normal text-grey-1 w-[27%]">
          {itemTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
      </section>
    </li>
  );
}

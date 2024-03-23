import { CartOrderItem } from '@/components/CartDetails/OrderItem';
import { ProductQuantityInput } from '@/components/Input/ProductQuantityInput';
import { ProductInterface } from '@/interfaces/product.interface';
import Image from 'next/image';

interface ConfirmInterface extends ProductInterface {
  onClose: () => void;
}

export function ProductConfirm({
  cover_image: image,
  description,
  id,
  name,
  price,
  category,
  combo,
  onClose,
}: ConfirmInterface) {
  const quantity: number = 1;
  const total: number = quantity * price;

  const onSubmit = () => {
    // handle data
    const requestBody = {
      products: {
        product_id: id,
        quantity,
        // comment
      },
    };
  };
  return (
    <>
      <section
        id={id}
        className="flex flex-col lg:flex-row
      justify-center lg:justify-between items-center lg:items-start w-full"
      >
        <figure className="w-56 flex items-center justify-center">
          <Image src={image} alt={description} height={125} width={125} />
          <figcaption className="hidden">{description}</figcaption>
        </figure>
        <section className="flex justify-between w-full">
          <section className="flex flex-col gap-2">
            <h4 className="text-size_7_16 text-grey-1 font-bold">{name}</h4>
            <h4 className="text-size_8_14 text-grey-3 font-normal">
              {description}
            </h4>
            <ProductQuantityInput />
          </section>
          <h4 className="text-size_7_16 text-grey-1 font-bold">
            {price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </h4>
        </section>
      </section>
      <form>
        <label
          htmlFor="comment"
          className="text-size_7_16 text-grey-1 font-bold"
        >
          Observações
          <textarea
            name="comment"
            id="comment"
            placeholder="Adicione uma observação ao pedido"
            className="resize-none w-full placeholder:font-normal min-h-32"
          />
        </label>
      </form>
      <section className="border-2 border-grey-5 border-opacity-40 rounded px-12 py-3 w-full flex flex-col gap-1">
        <section className="items">
          <ul>
            <CartOrderItem
              id={id}
              key={id}
              name={name}
              price={price}
              quantity={quantity}
            />
          </ul>
        </section>
        <hr className="border-t border-dashed border-grey-4 border-opacity-40" />
        <section className="flex justify-between items-center py-1">
          <p className="text-size_7_16 font-normal text-grey-1">
            Total do pedido:
          </p>
          <p className="text-size_4_28 font-bold text-grey-1">
            {total.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
        </section>
      </section>
      <section className="w-full flex flex-col gap-3 lg:flex-row lg:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="btn-big btn-green-outline"
        >
          Cancelar
        </button>
        <button type="submit" className="btn-big btn-green">
          Adicionar ao pedido
        </button>
      </section>
    </>
  );
}

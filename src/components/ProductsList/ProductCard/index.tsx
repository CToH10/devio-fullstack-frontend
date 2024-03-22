import { ProductInterface } from '@/interfaces/product.interface';
import Image from 'next/image';

export function ProductCard({
  cover_image: image,
  description,
  id,
  name,
  price,
}: ProductInterface) {
  return (
    <li
      key={id}
      className="h-64 shadow flex flex-col items-center rounded-xl product-card w-52 max-w-52 md:m-auto lg:m-0"
    >
      <button
        type="button"
        className="h-64 flex flex-col items-center rounded-xl w-52 max-w-52 md:m-auto lg:m-0"
        onClick={() => console.log(id)}
      >
        <section className="w-full max-h-24 h-24 rounded-t-xl">
          <figure className="w-full h-full relative object-contain flex text-center rounded-t-xl">
            <Image
              src={image}
              alt={description}
              aria-label={description}
              width={110}
              height={110}
              className="object-cover m-auto self-center mt-7 relative z-50"
            />
            <figcaption className="hidden">{description}</figcaption>
          </figure>
        </section>
        <section className="bg-whiteFixed rounded-t-lg w-full flex flex-col items-center justify-center h-40 px-3 relative">
          <section className="flex flex-col justify-between items-center w-full">
            <p className="font-semibold text-grey-1 text-size_6_20 max-w-full text-nowrap overflow-hidden text-ellipsis">
              {name}
            </p>
            <p className="font-normal text-grey-2 text-size_8_14 max-w-full text-nowrap overflow-hidden text-ellipsis">
              {description.split(', ')[0]}
            </p>
          </section>
          <p className="font-semibold text-grey-1 text-size_6_20 absolute bottom-2">
            {price}
          </p>
        </section>
      </button>
    </li>
  );
}

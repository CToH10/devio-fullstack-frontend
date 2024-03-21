export function CategoryCard({
  name,
  image,
}: {
  name: string;
  image: JSX.Element;
}) {
  return (
    <section className="categoryCard flex flex-col gap-3 items-center justify-center w-4/5">
      {image}
      <p>{name}</p>
    </section>
  );
}

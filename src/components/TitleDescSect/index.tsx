export function TitleDescriptionSection({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <h3 className="text-grey-1 font-bold text-size_6_20">{title}</h3>
      <span className="text-grey-2 font-normal text-size_8_14">
        {description}
      </span>
    </>
  );
}

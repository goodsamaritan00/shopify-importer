import type { IProductInfoProps } from "../interfaces";

export default function Importer({ product }: IProductInfoProps) {
  return (
    <ul className="flex flex-col gap-2">
      <li className="flex gap-2">
        <small className="text-sm text-neutral-500">Name</small>
        <span className="font-semibold">
          {product.herstelleradresse.importeur?.name}
        </span>
      </li>
      <li className="flex gap-2">
        <small className="text-sm text-neutral-500">Land</small>
        <img
          src={`https://flagcdn.com/w20/${product.herstelleradresse.importeur.land?.toLowerCase()}.png`}
        />
      </li>
      <li className="flex gap-2">
        <small className="text-sm text-neutral-500">Email</small>
        <span className="font-semibold">
          {product.herstelleradresse.importeur?.email}
        </span>
      </li>
      <li className="flex gap-2">
        <small className="text-sm text-neutral-500">Website</small>
        <span className="font-semibold">
          {product.herstelleradresse.importeur?.internet}
        </span>
      </li>
    </ul>
  );
}

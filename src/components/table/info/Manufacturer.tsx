import type { IInfoProps } from "../../interfaces/IEurasProduct";

export default function Manufacturer({ product }: IInfoProps) {
  return (
    <ul className="flex flex-col gap-2">
      <li>
        <h3 className="text-xl text-neutral-500 mb-2">Manufacturer Info</h3>
      </li>
      <li className="flex gap-2">
        <small className="text-sm text-neutral-500">Name</small>
        <span className="font-semibold">
          {product.herstelleradresse.hersteller.name}
        </span>
      </li>
      <li className="flex gap-2">
        <small className="text-sm text-neutral-500">Land</small>
        <img
          src={`https://flagcdn.com/w20/${product.herstelleradresse.hersteller.land.toLowerCase()}.png`}
        />
      </li>
      <li className="flex gap-2">
        <small className="text-sm text-neutral-500">Email</small>
        <span className="font-semibold">example@mail.com </span>
      </li>
      <li className="flex gap-2">
        <small className="text-sm text-neutral-500">Website</small>
        <span className="font-semibold">
          {product.herstelleradresse.hersteller.internet}
        </span>
      </li>
    </ul>
  );
}

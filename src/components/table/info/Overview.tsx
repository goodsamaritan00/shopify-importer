import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import type { IProductInfoProps } from "../interfaces";

export default function Overview({ product }: IProductInfoProps) {
  return (
    <ul className="flex flex-col gap-2">
      <li>
        <h3 className="text-xl text-neutral-500 mb-2">Product Overview</h3>
      </li>
      <li className="flex gap-2">
        <small className="text-sm text-neutral-500">Artikelnummer</small>
        <span className="font-semibold">{product.artikelnummer}</span>
      </li>
      <li className="flex gap-2">
        <small className="text-sm text-neutral-500">Artikelnummer</small>
        <span className="font-semibold">{product.originalnummer}</span>
      </li>
      <li className="flex gap-2">
        <small className="text-sm text-neutral-500">Artikelgruppen</small>
        <span className="font-semibold">{product.vgruppenname}</span>
      </li>
      <li className="flex gap-2">
        <small className="text-sm text-neutral-500">Bestellbar</small>
        {product.bestellbar === "J" && (
          <IoCheckmarkCircle className="text-xl text-green-400 " />
        )}
        {product.bestellbar === "N" && (
          <IoCloseCircle className="text-xl text-red-500 " />
        )}
      </li>
      <li className="flex gap-2">
        <small className="text-sm text-neutral-500">
          Ersatzartikel vorhanden
        </small>
        <span className="font-semibold">
          {product.ersatzartikel === "N" ? (
            <IoCloseCircle className="text-xl text-red-500 " />
          ) : (
            <IoCheckmarkCircle className="text-xl text-green-400 " />
          )}
        </span>
      </li>
      <li className="flex gap-2">
        <small className="text-sm text-neutral-500">Lieferstatus</small>
        <span className="font-semibold">{product.lieferzeit}</span>
      </li>
      <li className="flex gap-2">
        <small className="text-sm text-neutral-500">Lieferzeit</small>
        <span className="font-semibold">
          {product.lieferzeit_in_tagen} tage
        </span>
      </li>
      <li className="flex gap-2">
        <small className="text-sm text-neutral-500">Preis </small>
        <span className="font-semibold">{product.ekpreis}€</span>
      </li>
    </ul>
  );
}

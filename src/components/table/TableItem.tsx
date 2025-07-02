import { TableCell, TableRow } from "../ui/table";
import { IoCheckmarkCircle, IoClose, IoCloseCircle } from "react-icons/io5";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import {
  useImportedProducts,
  useShopifyImport,
  useShopifyGraphQl,
} from "../../hooks/useShopify";
import type { IEurasProduct } from "../../interfaces/IEuras";
import ProductInfo from "./info/ProductInfo";
import formatEurasToShopify from "../../utils/formatters/format-euras-to-shopify";
import {
  formatIsoDate,
  formatIsoDateAndTime,
} from "../../utils/formatters/format-iso-date";
import productImportStatus from "../../utils/product-import-status";

interface ITableItemProps {
  product: IEurasProduct;
  dataToImport: any;
  setDataToImport: any;
}

export default function TableItem({
  product,
  setDataToImport,
  dataToImport,
}: ITableItemProps) {
  const [part, setPart] = useState<any>({});
  const [displayInfo, setDisplayInfo] = useState<boolean>(false);

  const { importedProducts } = useImportedProducts();

  const importedProduct = importedProducts.products.filter(
    (importedProduct: any) => {
      return importedProduct.variants[0].sku === product.artikelnummer;
    },
  );

  console.log("PRODUCTTTTTTTT", importedProduct[0]);

  return (
    <>
      <TableRow
        onClick={() => {
          console.log("open");
          setDisplayInfo((prev) => !prev);
        }}
        className={`${displayInfo ? "bg-blue-100" : ""}`}
      >
        <TableCell>
          <Checkbox
            onCheckedChange={(checked) => {
              console.log("checked", checked);
              if (checked === true) {
                setDataToImport((prev: IEurasProduct[]) => [
                  ...prev,
                  formatEurasToShopify(product),
                ]);
              }
              if (checked === false) {
                setDataToImport((prev: any) =>
                  prev.filter(
                    (item: any) =>
                      item.variants[0].sku !== product.originalnummer,
                  ),
                );
              }
            }}
          />
        </TableCell>
        <TableCell>{product.artikelnummer}</TableCell>
        <TableCell>{product.originalnummer}</TableCell>
        <TableCell>{product.artikelbezeichnung}</TableCell>
        <TableCell>{product.artikelhersteller}</TableCell>
        <TableCell>{product.vgruppenname}</TableCell>
        <TableCell>{product.ekpreis}€</TableCell>
        {/* avaliability */}
        <TableCell>
          {product.bestellbar === "J" && (
            <IoCheckmarkCircle className="text-xl text-green-400 ml-6" />
          )}
          {product.bestellbar === "N" && (
            <IoCloseCircle className="text-xl text-red-500 ml-6" />
          )}
        </TableCell>
        {/* import status */}
        <TableCell>
          {productImportStatus(product, importedProducts) ? (
            <IoCheckmarkCircle className="text-xl text-green-400 ml-6" />
          ) : (
            <IoCloseCircle className="text-xl text-red-500 ml-6" />
          )}
        </TableCell>
        {/* last update */}
        <TableCell>
          {!importedProduct
            ? "Not Imported"
            : formatIsoDateAndTime(importedProduct[0]?.updated_at)}
        </TableCell>
      </TableRow>
      {displayInfo && <ProductInfo product={product} />}
    </>
  );
}

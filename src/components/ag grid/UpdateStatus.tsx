import { type RowClassParams } from "ag-grid-community";

import { useImportedProducts } from "../../hooks/useShopify";
import getImportedProducts from "../../utils/get-imported-products";
import { formatIsoDateAndTime } from "../../utils/formatters/format-iso-date";
import compareObjects from "../../utils/compare-objects";
import formatEurasToShopify from "../../utils/formatters/format-euras-to-shopify";
import Status from "./Status";
import useAuthContext from "../../hooks/useAuthContext";

export default function UpdateStatus(p: RowClassParams) {
  const { user } = useAuthContext();
  const { importedProducts } = useImportedProducts(user!.token);

  const importedProduct = getImportedProducts(p, importedProducts);

  console.log(importedProducts)

  return (
    <div className=" w-full h-full flex items-center ">
      {importedProduct ? (
        <Status
          status={
            compareObjects(formatEurasToShopify(p.data), importedProduct)
              ? "imported"
              : "warning"
          }
        >
          <span className={`text-xs mx-auto`}>
            {formatIsoDateAndTime(importedProduct.updated_at)}
          </span>
        </Status>
      ) : (
        <Status status="notImported">
          <span className="text-xs mx-auto">Not Imported</span>
        </Status>
      )}
    </div>
  );
}

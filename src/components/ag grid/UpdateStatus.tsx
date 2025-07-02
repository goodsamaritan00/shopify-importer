import React from "react";
import { useImportedProducts } from "../../hooks/useShopify";
import productImportStatus from "../../utils/product-import-status";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import GetImportedProducts from "../../utils/get-imported-products";
import { formatIsoDateAndTime } from "../../utils/formatters/format-iso-date";
import compareObjects from "../../utils/compare-objects";
import formatEurasToShopify from "../../utils/formatters/format-euras-to-shopify";
import Status from "./Status";
import useAuthContext from "../../hooks/useAuthContext";

export default function ImportStatus(p: any) {
  const { user } = useAuthContext();
  const { importedProducts } = useImportedProducts(user.token);

  const importedProduct = GetImportedProducts(p, importedProducts);

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

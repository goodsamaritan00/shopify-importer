import { type CellClassParams } from "ag-grid-community";

import productImportStatus from "../../utils/product-import-status";
import Status from "./Status";

import useAuthContext from "../../hooks/useAuthContext";
import { useImportedProducts } from "../../hooks/useShopify";

export default function ImportStatus(p: CellClassParams) {
  const { user } = useAuthContext();
  const { importedProducts } = useImportedProducts(user!.token);

  const isImported = productImportStatus(p.data, importedProducts);

  return (
    <div className="w-full h-full flex items-center ">
      {isImported ? (
        <Status status="imported">
          <span className="text-xs mx-auto">Imported</span>
        </Status>
      ) : (
        <Status status="notImported">
          <span className="text-xs mx-auto">Not Imported</span>
        </Status>
      )}
    </div>
  );
}

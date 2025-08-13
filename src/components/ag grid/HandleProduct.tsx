import { type CellClassParams } from "ag-grid-community";

import useAuthContext from "../../hooks/useAuthContext";
import {
  useImportedProducts,
  useShopifyImport,
  useShopifyDelete,
  useShopifyUpdate,
} from "../../hooks/useShopify";

import formatEurasToShopify from "../../utils/formatters/format-euras-to-shopify";
import getImportedProducts from "../../utils/get-imported-products";
import productImportStatus from "../../utils/product-import-status";

import { HiMiniArrowDownTray } from "react-icons/hi2";
import { GrSync } from "react-icons/gr";
import { FaInfo, FaTrashAlt } from "react-icons/fa";

import Loader from "../ui/loader";
import { Button } from "../ui/button";

export default function HandleProduct(p: CellClassParams) {
  const { user } = useAuthContext();

  if (!user) {
    return <div>User error, please login and try again.</div>;
  }

  const { importedProducts } = useImportedProducts(user.token);
  const { importProducts, isImporting } = useShopifyImport();
  const { updateProduct, isUpdatingProduct } = useShopifyUpdate();
  const { deleteProduct, isFetchingDelete } = useShopifyDelete();

  const importedProduct = getImportedProducts(p, importedProducts);
  const isImported = productImportStatus(p.data, importedProducts);

  return (
    <div className="flex items-center justify-center w-full">
      {!isImported ? (
        <Button
          className="text-xl"
          variant="table"
          onClick={() =>
            importProducts({
              data: formatEurasToShopify(p.data),
              token: user.token,
            })
          }
        >
          {isImporting ? (
            <Loader color="oklch(62.3% 0.214 259.815)" size={18} />
          ) : (
            <HiMiniArrowDownTray className="size-5" />
          )}
        </Button>
      ) : (
        <Button
          variant="table"
          onClick={() =>
            updateProduct({
              id: importedProduct.id,
              data: formatEurasToShopify(p.data),
              token: user.token,
            })
          }
        >
          {isUpdatingProduct ? (
            <Loader color="oklch(62.3% 0.214 259.815)" size={18} />
          ) : (
            <GrSync className="size-5" />
          )}
        </Button>
      )}
      <Button variant="table" disabled>
        <FaInfo className="size-5" />
      </Button>
      <Button
        variant="danger"
        disabled={!isImported ? true : false}
        onClick={() =>
          deleteProduct({
            id: importedProduct.id,
            token: user.token,
          })
        }
      >
        {isFetchingDelete ? (
          <Loader color="oklch(70.4% 0.191 22.216)" size={18} />
        ) : (
          <FaTrashAlt className="size-5" />
        )}
      </Button>
    </div>
  );
}

import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

import type { IProductInfoProps } from "../interfaces";
import {
  useShopifyImport,
  useShopifyDelete,
  useShopifyGraphQl,
  useShopifyUpdate,
} from "../../../hooks/useShopify";
import {
  formatIsoDateAndTime,
} from "../../../utils/formatters/format-iso-date";
import formatEurasToShopify from "../../../utils/formatters/format-euras-to-shopify";
import { Button } from "../../ui/button";
import formatShopifyProductId from "../../../utils/formatters/format-shopify-product-id";
import useAuthContext from "../../../hooks/useAuthContext";

export default function ShopifyStatus({ product }: IProductInfoProps) {
  const SKU: string = product.originalnummer;

  const { user } = useAuthContext();
  const { productGraphQl } = useShopifyGraphQl(SKU, user!.token);
  const { deleteProduct, isFetchingDelete } = useShopifyDelete(SKU);
  const { importProducts, isImporting } = useShopifyImport(SKU);
  const { updateProduct, isUpdatingProduct } = useShopifyUpdate(SKU);

  console.log("productQL", productGraphQl);

  if (!user) {
    return <div>User error, please log in.</div>;
  }

  return (
    <ul className="flex flex-col gap-2">
      <li className="mb-2">
        <h3 className="text-xl text-neutral-500">Shopify Status</h3>
      </li>
      <li className="flex gap-2 items-center">
        <small className="text-sm text-neutral-500">Imported</small>
        {!productGraphQl ? (
          <IoCloseCircle className="text-xl text-red-400" />
        ) : (
          <IoCheckmarkCircle className="text-xl text-green-400" />
        )}
      </li>
      <li className="flex gap-2">
        <small className="text-sm text-neutral-500">Created at</small>
        <span className="font-semibold">
          {formatIsoDateAndTime(productGraphQl?.createdAt) || "/"}
        </span>
      </li>
      <li className="flex gap-2">
        <small className="text-sm text-neutral-500">Last Updated</small>
        <span className="font-semibold">
          {formatIsoDateAndTime(productGraphQl?.updatedAt) || "/"}
        </span>
      </li>
      <li className="mt-auto flex flex-col gap-2">
        {productGraphQl === undefined ? (
          <Button
            onClick={() =>
              importProducts({
                data: formatEurasToShopify(product),
                token: user.token,
              })
            }
          >
            {isImporting ? "Importing..." : "Import Product"}
          </Button>
        ) : (
          <Button
            onClick={() => {
              console.log(productGraphQl.id);
              updateProduct({
                id: formatShopifyProductId(productGraphQl.id),
                data: formatEurasToShopify(product),
                token: user.token,
              });
            }}
          >
            {isUpdatingProduct ? "Updating..." : "Update Product"}
          </Button>
        )}
        <Button
          disabled={!productGraphQl}
          onClick={() => {
            if (productGraphQl) {
              console.log(productGraphQl.id);
              deleteProduct({
                id: formatShopifyProductId(productGraphQl.id),
                token: user.token,
              });
            }
          }}
          className="bg-red-500"
        >
          {isFetchingDelete ? "Removing..." : "Remove from Shopify"}
        </Button>
      </li>
    </ul>
  );
}

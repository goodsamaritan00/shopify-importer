import { type CellClassParams } from "ag-grid-community";

import useAuthContext from "../../hooks/useAuthContext";
import {
  useImportedProducts,
  useShopifyImport,
  useShopifyDelete,
  useShopifyUpdate,
} from "../../hooks/useShopify";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog"

import formatEurasToShopify from "../../utils/formatters/format-euras-to-shopify";
import getImportedProducts from "../../utils/get-imported-products";
import productImportStatus from "../../utils/product-import-status";

import { HiMiniArrowDownTray } from "react-icons/hi2";
import { GrSync } from "react-icons/gr";
import { FaInfo, FaTrashAlt } from "react-icons/fa";


import { Button } from "../ui/button";
import { toast } from "react-toastify";

export default function HandleProduct(p: CellClassParams) {
  const { user } = useAuthContext();

  if (!user) {
    return <div>User error, please login and try again.</div>;
  }

  const { importedProducts } = useImportedProducts(user.token);
  const { importProducts, isImporting } = useShopifyImport();
  const { updateProduct, isUpdatingProduct } = useShopifyUpdate();
  const { deleteProduct } = useShopifyDelete();

  const importedProduct = getImportedProducts(p, importedProducts);
  const isImported = productImportStatus(p.data, importedProducts);

  return (
    <div className="flex items-center justify-center w-full">
      {!isImported ? (
        <Button
          className="text-xl"
          variant="table"
          disabled={isImporting}
          onClick={() => {
            toast.promise(
              importProducts({
                data: formatEurasToShopify(p.data),
                token: user.token,
              }),
              {
                pending: "Importing Shopify product, please wait...",
                success: "Product successfuly imported!",
                error: "Something went wrong, please try again.",
              },
            );
          }}
        >
          <HiMiniArrowDownTray className="size-5" />
        </Button>
      ) : (
        <Button
          variant="table"
          disabled={isUpdatingProduct}
          onClick={() => {
            toast.promise(
              updateProduct({
                id: importedProduct.id,
                data: formatEurasToShopify(p.data),
                token: user.token,
              }),
              {
                pending: "Updating Shopify product, please wait...",
                success: "Product successfuly updated!",
                error: "Something went wrong, please try again.",
              },
            );
          }}
        >
          <GrSync className="size-5" />
        </Button>
      )}
      <Button variant="table" disabled>
        <FaInfo className="size-5" />
      </Button>
      <AlertDialog>
        <Button variant='ghost' disabled={!isImported}>
          <AlertDialogTrigger className="text-red-400">
            <FaTrashAlt className="size-5" />
          </AlertDialogTrigger>
        </Button>
        <AlertDialogContent className="border-4 border-blue-400">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete product from Shopify?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-blue-400 text-white">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-transparent border-none">
              <Button
                variant="danger"
                className="bg-red-400 text-white"
                onClick={async () => {
                  toast.promise(
                    deleteProduct({
                      id: importedProduct.id,
                      token: user.token,
                    }),
                    {
                      pending: "Removing product from Shopify, please wait...",
                      success: "Product successfuly removed!",
                      error: "Something went wrong, please try again",
                    },
                  );
                }}
              >
                Delete product
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Button
        variant="danger"
        disabled={!isImported ? true : false}
        onClick={async () => {
          toast.promise(
            deleteProduct({
              id: importedProduct.id,
              token: user.token,
            }),
            {
              pending: "Removing product from Shopify, please wait...",
              success: "Product successfuly removed!",
              error: "Something went wrong, please try again",
            },
          );
        }}
      >
      </Button>

    </div>
  );
}

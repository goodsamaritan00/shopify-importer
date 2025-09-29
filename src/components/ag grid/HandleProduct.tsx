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
} from "../../components/ui/alert-dialog";

import formatEurasToShopify from "../../utils/formatters/format-euras-to-shopify";
import getImportedProducts from "../../utils/get-imported-products";
import productImportStatus from "../../utils/product-import-status";

import { HiMiniArrowDownTray } from "react-icons/hi2";
import { GrSync } from "react-icons/gr";
import { FaTrashAlt } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";

import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { Input } from "../ui/input";
import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SelectItem } from "@radix-ui/react-select";

export default function HandleProduct(p: CellClassParams) {
  const { user } = useAuthContext();

  if (!user) {
    return <div>User error, please login and try again.</div>;
  }

  const [priceValue, setPriceValue] = useState<string>("");
  const [pricePrecentage, setPricePrecentage] = useState<string>("10");
  const [customPricePrecentage, setCustomPricePrecentage] = useState<string>("")

  const { importedProducts } = useImportedProducts(user.token);
  const { importProducts, isImporting } = useShopifyImport();
  const { updateProduct, isUpdatingProduct } = useShopifyUpdate();
  const { deleteProduct } = useShopifyDelete();

  const importedProduct = getImportedProducts(p, importedProducts);
  const isImported = productImportStatus(p.data, importedProducts);

  const handleChange = (e: any) => {
    const val = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(val)) {

      setPriceValue(val);
    }
  };

  const precentages: string[] = Array.from({ length: 10 }, (_, i) =>
    String((i + 1) * 10),
  );

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
                data: formatEurasToShopify(p.data, p.node.data.shopify_price),
                token: user.token,
              }).then((result) => {
                // after Shopify confirms, use the actual returned price
                const confirmedPrice = result?.variants?.[0]?.price ?? null; // null if not returned

                p.node.setDataValue("shopify_price", confirmedPrice);
                p.api.refreshCells({
                  rowNodes: [p.node],
                  columns: ["shopify_price"],
                  force: true,
                });
              }),
              {
                pending: "Importing Shopify product, please wait...",
                success: "Product successfully imported!",
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
            const oldPrice = importedProduct?.variants?.[0]?.price;
            const newPrice = p.node.data.shopify_price;
            const updatePrice =
              newPrice && newPrice !== oldPrice ? newPrice : oldPrice;
            toast.promise(
              updateProduct({
                id: importedProduct.id,
                data: formatEurasToShopify(p.data, updatePrice),
                token: user.token,
              }).then((result) => {
                // after Shopify confirms, use the actual returned price
                const confirmedPrice = result?.variants?.[0]?.price ?? null; // null if not returned

                p.node.setDataValue("shopify_price", confirmedPrice);
                p.api.refreshCells({
                  rowNodes: [p.node],
                  columns: ["shopify_price"],
                  force: true,
                });
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

      <AlertDialog>
        <Button variant="ghost">
          <AlertDialogTrigger>
            <IoAddCircle className="size-6 text-blue-400" />
          </AlertDialogTrigger>
        </Button>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg">
              Edit Shopify product price
            </AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col gap-1">
              <span>
                Edit price for product{" "}
                <span className="font-semibold">
                  {p.data.artikelbezeichnung} {p.data.artikelnummer}
                </span>
              </span>{" "}
              <span>
                Original price:{" "}
                <span className="font-semibold">{p.data.ekpreis + "€"}</span>
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="">
            <div className="flex items-center mr-auto gap-2">
              <Input
                onChange={handleChange}
                value={priceValue}
                placeholder="0.00"
                type="text"
                className="border-neutral-300  max-w-[100px] rounded-md focus:border-neutral-400"
              />
              <Select
                defaultValue={String(pricePrecentage)}
                onValueChange={(value: string) => {
                  setPricePrecentage(value);
                  const precentage = parseFloat(value);
                  const aswoPrice = parseFloat(p.data.ekpreis);

                  const newPrice = aswoPrice + aswoPrice * (precentage / 100);

                  setPriceValue(newPrice.toFixed(2).toString());
                }}
                value={String(pricePrecentage)}
              >
                <SelectTrigger size="medium" className="rounded-md shadow-none">
                  <SelectValue>{pricePrecentage + "%"}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {precentages.map((num) => (
                    <SelectItem
                      className="cursor-pointer"
                      key={num}
                      value={num.toString()}
                    >
                      {num + "%"}
                    </SelectItem>
                  ))}
                  <div className="flex items-center gap-2">
                    <Input onChange={(e) => setCustomPricePrecentage(e.target.value)} placeholder="e.g. 150%" className="border border-neutral-300 focus:border-neutral-400 rounded-md" />
                    <SelectItem value={customPricePrecentage || 'test'}>
                      <Button className="rounded-md" size='sm'>Add</Button>
                    </SelectItem>
                  </div>
                </SelectContent>
              </Select>
              <AlertDialogAction
                onClick={() => {
                  p.node.setDataValue("shopify_price", priceValue);
                  p.api.refreshCells({
                    rowNodes: [p.node],
                    columns: ["shopify_price"],
                    force: true,
                  });
                }}
                className="border-none rounded-md h-[32px]"
              >
                Add
              </AlertDialogAction>
              <Button
                onClick={() => {
                  p.node.setDataValue("shopify_price", null);
                  p.api.refreshCells({
                    rowNodes: [p.node],
                    columns: ["shopify_price"],
                    force: true,
                  });
                  setPriceValue("0.00")
                }}
                className="border-none rounded-md h-[32px]"
              >
                Clear
              </Button>
            </div>
            <AlertDialogCancel className="border-none hover:bg-transparent text-blue-400 hover:text-blue-300 absolute top-0 right-0 shadow-none -ml-4">
              <IoMdCloseCircle />
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <Button variant="ghost" disabled={!isImported}>
          <AlertDialogTrigger className="text-red-400">
            <FaTrashAlt className="size-5" />
          </AlertDialogTrigger>
        </Button>
        <AlertDialogContent className="border- border-blue-400">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="mb-4">
              Are you sure you want to delete product{" "}
              <span className="font-bold">{p.data.artikelbezeichnung}</span>{" "}
              from Shopify?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-blue-400 px-4 -mr-4 hover:bg-blue-400 rounded-full hover:text-white text-white h-full text-sm ">
              <IoMdCloseCircle />
            </AlertDialogCancel>
            <AlertDialogAction className="bg-transparent border-none">
              <Button
                variant="danger"
                className="bg-red-500 text-white rounded-full text-sm"
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

                  p.node.setDataValue("shopify_price", null);
                  p.api.refreshCells({
                    rowNodes: [p.node],
                    columns: ["shopify_price"],
                    force: true,
                  });
                }}
              >
                Delete product
                <FaTrashAlt />
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
      ></Button>
    </div>
  );
}

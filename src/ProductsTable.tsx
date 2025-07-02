import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { FaSearch, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import TableItem from "./components/table/TableItem";
import useEurasProducts from "./hooks/useEuras";
import { useImportedProducts, useShopifyImport } from "./hooks/useShopify";
import type { IEurasProduct } from "./interfaces/IEuras";
import { ToastContainer } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import useAuthContext from "./hooks/useAuthContext";

const TABLE_HEADERS = [
  "Select",
  "SKU",
  "Model Number",
  "Product Name",
  "Manufacturer",
  "Device Type",
  "Price",
  "Availability",
  "Import Status",
  "Last Updated",
];

export default function ProductsTable() {
  const [nameQuery, setNameQuery] = useState<string>("");
  const [siteNumber, setSiteNumber] = useState<string>("1");
  const [displayNr, setDisplayNr] = useState("40");
  const [dataToImport, setDataToImport] = useState<IEurasProduct[] | []>([]);

  const { user } = useAuthContext();

  const {
    eurasProducts,
    isFetchingEurasProducts,
    isErrorEurasProducts,
    errorEurasProducts,
    refetchEurasProducts,
  } = useEurasProducts(nameQuery, displayNr, siteNumber, user.token);
  const { isImporting, isErrorImport, errorImport, importProducts } =
    useShopifyImport("");

  const { refecthImportedProducts, importedProducts } = useImportedProducts(
    user.token,
  );

  useEffect(() => {
    console.log("IMPORT MULTIPLE PRODUCTS", dataToImport);
  }, [dataToImport]);

  if (isErrorEurasProducts || isErrorImport) {
    console.log(errorEurasProducts?.message);
    console.log(errorImport?.message);
  }

  console.log("Imported products", importedProducts);

  return (
    <>
      <div className="max-w-[80vw] mx-auto mt-12">
        {/* search box */}
        <div className="w-full flex justify-between items-center">
          <div className="w-[400px] max-w-[400px] flex items-center h-9 gap-2 my-4 relative">
            <Input
              placeholder="Search…"
              value={nameQuery}
              onChange={(e) => setNameQuery(e.target.value)}
              className="shadow-sm h-full w-full"
            />
            <Button
              variant="ghost"
              className="h-full flex items-center absolute right-0 text-blue-400"
              disabled={!nameQuery.trim()}
              onClick={() => {
                refetchEurasProducts();
                refecthImportedProducts();
              }}
            >
              <FaSearch />
            </Button>
          </div>
        </div>

        <Table>
          <TableCaption>A list of searched parts.</TableCaption>

          <TableHeader className="bg-blue-400">
            <TableRow>
              {TABLE_HEADERS.map((h) => (
                <TableHead key={h} className="text-white font-semibold">
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {!eurasProducts.length ? (
              <TableRow>
                <TableCell>
                  {isFetchingEurasProducts ? (
                    <p>Getting products…</p>
                  ) : (
                    <span>Search products for results.</span>
                  )}
                </TableCell>
              </TableRow>
            ) : (
              eurasProducts.map((product: IEurasProduct, idx: number) => (
                <TableItem
                  dataToImport={dataToImport}
                  setDataToImport={setDataToImport}
                  product={product}
                  key={idx}
                />
              ))
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={10}>
                <div className="flex justify-between items-center py-3">
                  <span>
                    Total&nbsp;Results: <strong>{eurasProducts.length}</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    <FaAngleLeft
                      onClick={() => {
                        setSiteNumber((prev) => prev - 1);
                        refetchEurasProducts();
                      }}
                      className="text-xl"
                    />
                    <Input value={siteNumber} className="max-w-[50px]" />
                    <FaAngleRight
                      onClick={() => {
                        setSiteNumber((prev) => prev + 1);
                        refetchEurasProducts();
                      }}
                      className="text-xl"
                    />
                  </div>
                  <Button
                    onClick={() => {
                      if (!dataToImport) {
                        console.log("Import data cant be empty");
                        return;
                      }
                      for (const product of dataToImport) {
                        if (!user) return;

                        importProducts({
                          data: product,
                          token: user?.token,
                        });
                      }
                    }}
                  >
                    {isImporting ? "Importing products..." : "Import products"}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
}

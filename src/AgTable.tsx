import { useRef, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import {
  type CellClassParams,
  type IRowModel,
  type ValueFormatterParams,
} from "ag-grid-community";
import { Input } from "./components/ui/input";
import "ag-grid-community/styles/ag-theme-material.css";

import useEurasProducts from "./hooks/useEuras";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Button } from "./components/ui/button";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

import ImportStatus from "./components/ag grid/ImportStatus";
import HandleProduct from "./components/ag grid/HandleProduct";
import UpdateStatus from "./components/ag grid/UpdateStatus";
import AvaliabilityStatus from "./components/ag grid/AvaliabilityStatus";
import ImportSelectedButton from "./components/ag grid/ImportSelectedButton";

import { FaSearch } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";

import { useLogout } from "./hooks/useAuth";
import useAuthContext from "./hooks/useAuthContext";
import Loader from "./components/ui/loader";

export default function AgTable() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [displayNr, setDisplayNr] = useState("40");
  const [siteNumber, setSiteNumber] = useState<string>("1");

  const { user, dispatch } = useAuthContext();

  const { eurasProducts, isFetchingEurasProducts } =
    useEurasProducts(searchQuery, displayNr, siteNumber, user!.token);

  const { logout } = useLogout();

  const gridRef = useRef<AgGridReact>(null);

  const defaultColDef = {
    flex: 1,
    filter: true,
    sortable: true,
    resizable: true,
    cellStyle: { display: "flex", alignItems: "center" },
  };

  console.log("products", eurasProducts);

  const [colDefs] = useState([
    {
      field: "select",
      headerName: "Import",
      headerComponent: ImportSelectedButton,
      flex: 1.2,
      minWidth: 150,
      headerCheckboxSelection: true,
      checkboxSelection: true,
      filter: false,
      cellRenderer: HandleProduct,
    },
    {
      field: "thumbnailurl",
      headerName: "Image",
      flex: 1,
      minWidth: 80,
      maxWidth: 120,
      cellRenderer: (p: CellClassParams) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <img
            className="border border-neutral-400 h-[40px] rounded-md w-[40px] object-cover"
            src={p.data.thumbnailurl}
            alt="Product"
          />
        </div>
      ),
    },
    {
      field: "artikelbezeichnung",
      headerName: "Product Name",
      flex: 2.3,
      minWidth: 150,
      editable: true,
    },
    {
      field: "artikelnummer",
      headerName: "SKU",
      flex: 0.5,
      minWidth: 100,
    },
    {
      field: "originalnummer",
      headerName: "OEM",
      flex: 0.8,
      minWidth: 120,
    },
    {
      field: "artikelhersteller",
      headerName: "Manufacturer",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "vgruppenname",
      headerName: "Category",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "ekpreis",
      headerName: "Price",
      flex: 0.7,
      minWidth: 90,
      valueFormatter: (p: ValueFormatterParams) => p.value + "€",
    },
    {
      field: "bestellbar",
      headerName: "Available",
      flex: 0.8,
      minWidth: 100,
      cellRenderer: AvaliabilityStatus,
    },
    {
      field: "lieferzeit_in_tagen",
      headerName: "ETA",
      flex: 0.6,
      minWidth: 50,
      valueFormatter: (p: ValueFormatterParams) =>
        p.value.toLocaleString() + " days",
    },
    {
      field: "import",
      headerName: "Import status",
      flex: 1.3,
      minWidth: 140,
      cellRenderer: ImportStatus,
    },
    {
      field: "update",
      headerName: "Last Updated",
      flex: 1.3,
      minWidth: 140,
      cellRenderer: UpdateStatus,
    },
  ]);

  console.log("eurasProducts", eurasProducts);

  return (
    <div className="ag-theme-material h-screen flex flex-col px-1 pb-1 pt-4 text-neutral-500 bg-neutral-50">
      {/* nav */}
      <div className="flex items-center justify-between pb-4 px-14 relative">
        {/* logo */}
        <h2 className="text-3xl font-[200] text-blue-400">
          <span className="font-[600]">Shopify</span>
          Importer
        </h2>
        {/* search input */}
        <div className="flex items-center gap-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearchQuery(searchInput);
              setSiteNumber("1");
            }}
            className="w-[500px] relative group"
          >
            <Input
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search product name, SKU or OEM..."
              className="border-neutral-200 text-neutral-500 rounded-full focus:border-neutral-400"
            />
            <Button
              type="submit"
              variant="ghost"
              className="absolute top-0 right-0 h-full"
            >
              <FaSearch className="text-neutral-300 transition duration-500 group-focus-within:text-neutral-400" />
            </Button>
          </form>

          {/* nav menu */}
          <DropdownMenu>
            <DropdownMenuTrigger className="hover:bg-white/20 rounded-md py-1 px-2 flex items-center gap-2">
              <IoMenu className="text-3xl" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                Welcome, {user ? user.email : "User"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Search Products</DropdownMenuItem>
              <DropdownMenuItem>Imported Products</DropdownMenuItem>
              <DropdownMenuItem>Graph</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logout(dispatch)}>
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* product table */}
      {isFetchingEurasProducts ? (
        <div className="w-full h-full  bg-white flex items-center justify-center flex-col gap-4">
          <Loader size={46} color="oklch(70.7% 0.165 254.624)" />
          <span className="font-semibold">
            Fetching products, please wait...
          </span>
        </div>
      ) : (
        <div className="h-full w-full relative flex-grow min-h-0 overflow-auto">
          <AgGridReact
            rowHeight={60}
            ref={gridRef}
            rowData={eurasProducts?.data || []}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            suppressRowClickSelection={true}
            rowSelection="multiple"
            onCellDoubleClicked={(p: ValueFormatterParams) => {
              if (p.colDef.field === 'vgruppenname') {
                gridRef.current?.api.deselectAll()

                 gridRef.current?.api.forEachNode((node: any) => {
                  if (node.data.vgruppenname === p.data.vgruppenname) {
                    node.setSelected(true)
                  }
                 })
              }
            }}
          />
        </div>
      )}
      <div className="bg-white py-1 flex items-center border justify-between gap-8 px-18">
        <div className="text-sm flex items-center gap-2">
          <span>Total Results:</span>
          <span className="font-bold text-neutral-700">
            {eurasProducts.total}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-500">Show</span>
          <Select
            defaultValue={displayNr}
            onValueChange={(value) => {
              setDisplayNr(value);
            }}
            value={displayNr} // control the value from sta
          >
            <SelectTrigger>
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="font-bold text-neutral-700" value="10">
                10
              </SelectItem>
              <SelectItem className="font-bold text-neutral-700" value="20">
                20
              </SelectItem>
              <SelectItem className="font-bold text-neutral-700" value="30">
                30
              </SelectItem>
              <SelectItem className="font-bold text-neutral-700" value="40">
                40
              </SelectItem>
              <SelectItem className="font-bold text-neutral-700" value="50">
                50
              </SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-neutral-500">per page</span>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  setSiteNumber((prev) => {
                    const prevNum = Number(prev);
                    return prevNum > 1 ? String(prevNum - 1) : prev;
                  });
                }}
              />
            </PaginationItem>

            {[...Array(eurasProducts.siteNumbers)].map((_, index) => {
              const site = index + 1;
              return (
                <PaginationItem
                  key={site}
                  data-page={site}
                  onClick={(e) => {
                    const page = (e.currentTarget as HTMLElement).dataset.page;
                    if (page) {
                      setSiteNumber(page);
                    }
                  }}
                >
                  <PaginationLink isActive={site.toString() === siteNumber}>
                    {site}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  setSiteNumber((prev) => {
                    const prevNum = Number(prev);
                    return prevNum < eurasProducts.siteNumbers
                      ? String(prevNum + 1)
                      : prev;
                  });
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

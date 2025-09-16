import { useRef, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import { type ValueFormatterParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-material.css";

import { useEurasProducts } from "./hooks/useEuras";
import { AnimatePresence, motion } from "motion/react";

import useAuthContext from "./hooks/useAuthContext";
import Loader from "./components/ui/loader";
import SearchForm from "./components/ag grid/SearchForm";
import {
  defaultProductColDefs,
  productColDefs,
} from "./table-config/productTableConfig";
import TablePagination from "./components/table-pagination/TablePagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { IoMdAddCircle } from "react-icons/io";
import ApplianceTable from "./ApplianceTable";
import { Button } from "./components/ui/button";
import { useImportedProducts } from "./hooks/useShopify";

export default function ProductTable() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [displayNumber, setDisplayNumber] = useState("40");
  const [currentSite, setCurrentSite] = useState<string>("1");
  const [tableType, setTableType] = useState<string>(
    "Products",
  );

  const { user } = useAuthContext();
  const { eurasProducts, isFetchingEurasProducts } = useEurasProducts(
    searchQuery,
    displayNumber,
    currentSite,
    user!.token,
  );
  const { importedProducts } = useImportedProducts(user!.token)

  const gridRef = useRef<AgGridReact>(null);

  const tableVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  };

  return (
    <div className="ag-theme-material h-full mx-auto flex flex-col pt-2 px-8">
   
      <div className=" my-4 flex items-center gap-2 w-full">
   <h2 className="text-xl font-semibold text-neutral-700 mr-auto">
        Import Products from EURAS Database
      </h2>        <SearchForm
          searchInput={searchInput}
          searchQuery={searchQuery}
          setSearchInput={setSearchInput}
          setCurrentSite={setCurrentSite}
          setSearchQuery={setSearchQuery}
        />
        <Select onValueChange={(value: string) => setTableType(value)}>
          <SelectTrigger className="w-[180px] rounded-md">
            <SelectValue placeholder={tableType} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select table</SelectLabel>
              <SelectItem value="Products">Products</SelectItem>
              <SelectItem value="Devices">Devices</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button className="text-sm w-[150px]">
          Add manually
          <IoMdAddCircle className="text-lg" />
        </Button>
      </div>
      {tableType === "Products" && (
        <AnimatePresence>
          <motion.div
            variants={tableVariants}
            initial="hidden"
            animate="visible"
            className=" mb-8 rounded-md overflow-hidden  w-full flex flex-col relative flex-grow "
          >
            <AgGridReact
              rowHeight={70}
              loading={isFetchingEurasProducts}
              context={{ importedProducts }}
              loadingOverlayComponent={() => {
                return (
                  <div className="flex flex-col items-center gap-2">
                    <Loader size={30} color="oklch(70.7% 0.165 254.624)" />
                    <small className="text-sm font-semibold text-neutral-500">
                      Getting products, please wait...
                    </small>
                  </div>
                );
              }}
              ref={gridRef}
              rowData={eurasProducts.data}
              columnDefs={productColDefs}
              defaultColDef={defaultProductColDefs}
              suppressRowClickSelection={true}
              rowSelection="multiple"
              overlayNoRowsTemplate="No rows to show"
              onCellDoubleClicked={(p: ValueFormatterParams) => {
                if (p.colDef.field === "vgruppenname") {
                  gridRef.current?.api.deselectAll();
                  gridRef.current?.api.forEachNode((node: any) => {
                    if (node.data.vgruppenname === p.data.vgruppenname) {
                      node.setSelected(true);
                    }
                  });
                }
              }}
            />
            <TablePagination
              displayNumber={displayNumber}
              setDisplayNumber={setDisplayNumber}
              setCurrentSite={setCurrentSite}
              currentSite={currentSite}
              siteTotal={eurasProducts.siteNumbers}
              total={eurasProducts.total}
            />
          </motion.div>
        </AnimatePresence>
      )}
      {tableType === "Devices" && (
        <AnimatePresence>
          <motion.div
            variants={tableVariants}
            initial="hidden"
            animate="visible"
            className="h-full mb-8 rounded-xl overflow-hidden  w-full flex flex-col relative flex-grow " 
          >
            <ApplianceTable searchQuery={searchQuery} />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

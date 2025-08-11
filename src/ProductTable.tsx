import { useEffect, useRef, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import { type ValueFormatterParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-material.css";

import { useEurasProducts } from "./hooks/useEuras";

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

import { MdOutlineDragHandle } from "react-icons/md";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import useAuthContext from "./hooks/useAuthContext";
import Loader from "./components/ui/loader";
import ApplianceTable from "./ApplianceTable";
import useProductTableContext from "./hooks/useProductTableContext";
import SearchForm from "./components/ag grid/SearchForm";
import NavMenu from "./components/ag grid/NavMenu";
import { defaultProductColDefs, productColDefs } from "./table-config/productTableConfig";
// import { defaultProductColDefs, productColDefs } from "./components/table-config/productTableConfig";

export default function ProductTable() {
  const { rowData, setRowData } = useProductTableContext();

  const [searchInput, setSearchInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [displayNumber, setDisplayNumber] = useState("40");
  const [siteNumber, setSiteNumber] = useState<string>("1");

  const { user } = useAuthContext();
  const { eurasProducts, isFetchingEurasProducts, isSuccessEurasProducts } =
    useEurasProducts(searchQuery, displayNumber, siteNumber, user!.token);

  const gridRef = useRef<AgGridReact>(null);

  useEffect(() => {
    if (eurasProducts.data && isSuccessEurasProducts) {
      setRowData(eurasProducts.data);
    }
  }, [isSuccessEurasProducts, siteNumber, displayNumber, searchQuery]);

  return (
    <div className="ag-theme-material h-screen mx-auto flex flex-col px-1 pb-1 pt-4 text-neutral-500 bg-neutral-50">
      <div className="flex items-center justify-between pb-4 px-14 relative">
        <h2 className="text-3xl font-[200] text-blue-400">
          <span className="font-[600]">Shopify</span>
          Importer
        </h2>
        {/* search product by name, sku or oem */}
        <div className="flex items-center gap-4">
          <SearchForm
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            setSiteNumber={setSiteNumber}
            setSearchQuery={setSearchQuery}
          />
          <NavMenu />
        </div>
      </div>
      <PanelGroup direction="vertical">
        <Panel defaultSize={30} minSize={10}>
          <ApplianceTable searchQuery={searchQuery} />
        </Panel>

        <PanelResizeHandle className="h-5 flex items-center justify-center bg-gray-50">
          <MdOutlineDragHandle className="pointer-events-none text-4xl text-blue-400" />
        </PanelResizeHandle>

        <Panel minSize={20}>
          {isFetchingEurasProducts ? <Loader size={46} color="oklch(70.7% 0.165 254.624)" />
           : 
            <div className="h-full w-full relative flex-grow min-h-0 overflow-auto">
              <AgGridReact
                rowHeight={60}
                ref={gridRef}
                rowData={rowData}
                columnDefs={productColDefs}
                defaultColDef={defaultProductColDefs}
                suppressRowClickSelection={true}
                rowSelection="multiple"
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
            </div>
          }
        </Panel>
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
                defaultValue={displayNumber}
                onValueChange={(value) => setDisplayNumber(value)}
                value={displayNumber}
              >
                <SelectTrigger>
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  {[10, 20, 30, 40, 50].map((value) => (
                    <SelectItem
                      key={value}
                      className="font-bold text-neutral-700"
                      value={String(value)}
                    >
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-sm text-neutral-500">per page</span>
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setSiteNumber((prev) => {
                        const prevNum = Number(prev);
                        return prevNum > 1 ? String(prevNum - 1) : prev;
                      })
                    }
                  />
                </PaginationItem>

                {[...Array(eurasProducts.siteNumbers)].map((_, index) => {
                  const site = index + 1;
                  return (
                    <PaginationItem
                      key={site}
                      data-page={site}
                      onClick={(e) => {
                        const page = (e.currentTarget as HTMLElement).dataset
                          .page;
                        if (page) setSiteNumber(page);
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
                    onClick={() =>
                      setSiteNumber((prev) => {
                        const prevNum = Number(prev);
                        return prevNum < eurasProducts.siteNumbers
                          ? String(prevNum + 1)
                          : prev;
                      })
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
      </PanelGroup>
    </div>
  );
}

import { useRef, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import { type ValueFormatterParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-material.css";

import { useEurasProducts } from "./hooks/useEuras";

import { MdOutlineDragHandle } from "react-icons/md";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import useAuthContext from "./hooks/useAuthContext";
import Loader from "./components/ui/loader";
import ApplianceTable from "./ApplianceTable";
import SearchForm from "./components/ag grid/SearchForm";
import {
  defaultProductColDefs,
  productColDefs,
} from "./table-config/productTableConfig";
import TablePagination from "./components/table-pagination/TablePagination";

export default function ProductTable() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [displayNumber, setDisplayNumber] = useState("40");
  const [currentSite, setCurrentSite] = useState<string>("1");

  const { user } = useAuthContext();
  const { eurasProducts, isFetchingEurasProducts } = useEurasProducts(
    searchQuery,
    displayNumber,
    currentSite,
    user!.token,
  );

  const gridRef = useRef<AgGridReact>(null);

  console.log('euras oridzcuts', eurasProducts)

  return (
    <div className="ag-theme-material h-full mx-auto flex flex-col px-1  pt-4 ">
      <div className="flex flex-col gap-1 w-1/4 mb-4 mx-14 text-neutral-500">
        <small>Find products from EURAS database</small>
        <SearchForm
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setCurrentSite={setCurrentSite}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <PanelGroup direction="vertical">
        <Panel className="flex flex-col  " defaultSize={30} minSize={10}>
          <ApplianceTable searchQuery={searchQuery} />
        </Panel>

        <PanelResizeHandle className="h-5 flex items-center justify-center bg-gray-50">
          <MdOutlineDragHandle className="pointer-events-none text-4xl text-blue-300" />
        </PanelResizeHandle>

        <Panel className="flex flex-col" minSize={20}>
          <div className="h-full w-full flex flex-col relative flex-grow min-h-0 ">
              <AgGridReact
                rowHeight={70}
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
            {isFetchingEurasProducts && (
                <Loader size={25} color="blue" className="absolute" />
            )}
            <TablePagination
              displayNumber={displayNumber}
              setDisplayNumber={setDisplayNumber}
              setCurrentSite={setCurrentSite}
              currentSite={currentSite}
              siteTotal={eurasProducts.siteNumbers}
              total={eurasProducts.total}
            />
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}

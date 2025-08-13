import { useRef, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import { type ValueFormatterParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-material.css";

import {  useEurasProductsByAppliances } from "./hooks/useEuras";

import { Panel, PanelGroup } from "react-resizable-panels";

import useAuthContext from "./hooks/useAuthContext";
import Loader from "./components/ui/loader";

import {
  defaultProductColDefs,
  productColDefs,
} from "./table-config/productTableConfig";
import { useLocation } from "react-router-dom";
import SearchForm from "./components/ag grid/SearchForm";

export default function ProductsByAppliancesTable() {
  const location = useLocation();

  const { deviceId, searchQuery } = location.state;

  const [searchInput, setSearchInput] = useState<string>("");
  const [productQuery, setProductQuery] = useState<string>(searchQuery);
  const [siteNumber, setSiteNumber] = useState<string>("1");

  const { user } = useAuthContext();

  const { eurasProductsByAppliances, isFetchingEurasProductsByAppliances } =
    useEurasProductsByAppliances(
      productQuery,
      deviceId,
      siteNumber,
      user!!.token,
    );

  const gridRef = useRef<AgGridReact>(null);

  return (
    <div className="ag-theme-material h-full mx-auto flex flex-col px-1 pb-1 pt-4 text-neutral-500 bg-neutral-50">
      <div className="flex px-16">
        <SearchForm
          searchInput={searchInput}
          setSearchQuery={setProductQuery}
          setSiteNumber={setSiteNumber}
          setSearchInput={setSearchInput}
        />
      </div>
      <PanelGroup direction="vertical">
        {/* <PanelResizeHandle className="h-5 flex items-center justify-center bg-gray-50">
          <MdOutlineDragHandle className="pointer-events-none text-4xl text-blue-400" />
        </PanelResizeHandle> */}

        <Panel minSize={20}>
          {isFetchingEurasProductsByAppliances ? (
            <Loader size={46} color="oklch(70.7% 0.165 254.624)" />
          ) : (
            <div className="h-full w-full relative flex-grow min-h-0 overflow-auto">
              <AgGridReact
                rowHeight={70}
                ref={gridRef}
                rowData={eurasProductsByAppliances.data || []}
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
          )}
        </Panel>
      </PanelGroup>
    </div>
  );
}

import { useRef, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import { type ValueFormatterParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-material.css";

import {  useEurasApplianceCategories, useEurasProductsByAppliances } from "./hooks/useEuras";

import { Panel, PanelGroup } from "react-resizable-panels";

import useAuthContext from "./hooks/useAuthContext";

import {
  defaultProductColDefs,
  productColDefs,
} from "./table-config/productTableConfig";
import { useLocation, useNavigate } from "react-router-dom";
import SearchForm from "./components/ag grid/SearchForm";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { MdArrowBack } from "react-icons/md";
import { Button } from "./components/ui/button";

export default function ProductsByAppliancesTable() {
  const location = useLocation();
  const navigate = useNavigate()

  const { deviceId, searchQuery, deviceName } = location.state;

  console.log(deviceId, searchQuery)

  const [searchInput, setSearchInput] = useState<string>(searchQuery);
  const [productQuery, setProductQuery] = useState<string>(searchQuery);
  const [siteNumber, setSiteNumber] = useState<string>("1");
  const [id] = useState(deviceId)

  const { user } = useAuthContext();

  const { eurasProductsByAppliances, isFetchingEurasProductsByAppliances } =
    useEurasProductsByAppliances(
      productQuery,
      id,
      siteNumber,
      user!!.token,
    );

  const { eurasApplianceCategories } = useEurasApplianceCategories(deviceId, user!!.token)

  const gridRef = useRef<AgGridReact>(null);

  return (
    <div className="ag-theme-material h-full mx-auto flex flex-col px-1 pb-1 pt-4 text-neutral-500 bg-neutral-50">
      <Button onClick={() => navigate('/')} size='sm' className="text-sm max-w-[35px] mx-14 mb-4 rounded-sm">
        <MdArrowBack />
      </Button>
      <span className="text-blue-400 font-semibold text-lg mb-2 mx-14">{deviceName || 'Device name not avaliable'}</span>
      <div className="flex gap-8 px-14 mb-4">
        <div className="w-1/4 flex flex-col gap-2">
          <small className="text-sm">Search product by model name</small>
        <SearchForm
          searchInput={searchInput}
          setSearchQuery={setProductQuery}
          setCurrentSite={setSiteNumber}
          setSearchInput={setSearchInput}
        />
        </div>
        <div className="w-1/8 flex flex-col gap-2">
          <small className="text-sm">Search products by category</small>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="w-full">
              {eurasApplianceCategories.map((category: any) => {
                return <SelectItem key={category.vgruppenid} className="" value={category.vgruppenname}>{category.vgruppenname}</SelectItem>

              })}
            </SelectContent>
          </Select>
        </div>
       </div>
      <PanelGroup direction="vertical">
        <Panel minSize={20}>
          {isFetchingEurasProductsByAppliances ? (
            'Loading'
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

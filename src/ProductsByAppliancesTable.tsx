import { useRef, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import { type ValueFormatterParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-material.css";

import { TbArrowBack } from "react-icons/tb";

import {
  useEurasApplianceCategories,
  useEurasProductsByAppliances,
} from "./hooks/useEuras";

import { Panel, PanelGroup } from "react-resizable-panels";

import useAuthContext from "./hooks/useAuthContext";

import {
  defaultProductColDefs,
  productColDefs,
} from "./table-config/productTableConfig";
import { Link, useLocation } from "react-router-dom";
import SearchForm from "./components/ag grid/SearchForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Button } from "./components/ui/button";
import TablePagination from "./components/table-pagination/TablePagination";
import Loader from "./components/ui/loader";

export default function ProductsByAppliancesTable() {
  const location = useLocation();

  const { deviceId, deviceName } = location.state;

  const [searchInput, setSearchInput] = useState<string>("");
  const [productQuery, setProductQuery] = useState<string>("");
  const [category, setCategory] = useState("");
  const [displayNumber, setDisplayNumber] = useState("40");
  const [siteNumber, setSiteNumber] = useState<string>("1");
  const [id] = useState(deviceId);

  const { user } = useAuthContext();

  const { eurasProductsByAppliances, isFetchingEurasProductsByAppliances } =
    useEurasProductsByAppliances(
      id,
      siteNumber,
      user?.token!!,
      productQuery,
      category,
    );

  const { eurasApplianceCategories } = useEurasApplianceCategories(
    deviceId,
    user!!.token,
  );

  const gridRef = useRef<AgGridReact>(null);

  return (
    <div className="ag-theme-material h-full mx-auto flex flex-col  px-8 pb-8 pt-2 text-neutral-500 bg-neutral-50">
      <div className=" my-4 flex items-center gap-2 w-full">
         <h2 className="text-lg font-semibold text-neutral-700 mr-auto">
        Results for device: <span className="ml-2">{deviceName}</span>
      </h2>  
          <SearchForm
            searchInput={searchInput}
            searchQuery={productQuery}
            setSearchQuery={setProductQuery}
            setCurrentSite={setSiteNumber}
            setSearchInput={setSearchInput}
            setCategory={setCategory}
          />

          <Select
            onValueChange={(value: string) => {
              setProductQuery("");
              setCategory(value);
            }}
          >
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Select Category " />
            </SelectTrigger>
            <SelectContent >
              {eurasApplianceCategories.map((category: any) => {
                return (
                  <SelectItem
                    key={category.vgruppenid}
                    className=""
                    value={category.vgruppenid}
                    onSelect={() => {
                      setCategory(category.vgruppenid);
                    }}
                  >
                    {category.vgruppenname}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Link to='/'>
          <Button className="text-sm">Search new device <TbArrowBack className="text-xl" /></Button></Link>
        </div>
      <PanelGroup direction="vertical">
        <Panel minSize={20}>
          <div className="h-full w-full relative flex-grow min-h-0 overflow-auto">
            <AgGridReact
              rowHeight={70}
              ref={gridRef}
              rowData={eurasProductsByAppliances.data || []}
              columnDefs={productColDefs}
              defaultColDef={defaultProductColDefs}
              loading={isFetchingEurasProductsByAppliances}
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
        </Panel>
      </PanelGroup>
      <TablePagination
        displayNumber={displayNumber}
        setDisplayNumber={setDisplayNumber}
        setCurrentSite={setSiteNumber}
        currentSite={siteNumber}
        total={eurasProductsByAppliances.total}
      />
    </div>
  );
}

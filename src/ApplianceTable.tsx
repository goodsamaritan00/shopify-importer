import { AgGridReact } from "ag-grid-react";
import { useRef, useState } from "react";
import useAuthContext from "./hooks/useAuthContext";
import { useEurasAppliances } from "./hooks/useEuras";
import ShowProductsButton from "./components/appliance table/ShowProductsButton";
import Loader from "./components/ui/loader";

export default function ApplianceTable({ searchQuery }: any) {
  const [anzahl] = useState("10");
  const [site] = useState<string>("1");

  const { user } = useAuthContext();

  const { eurasAppliances, isFetchingEurasAppliances } = useEurasAppliances(
    searchQuery,
    anzahl,
    site,
    user!.token,
  );

  const gridRef = useRef<AgGridReact>(null);

  const defaultColDef = {
    flex: 1,
    filter: true,
    sortable: true,
    resizable: true,
    cellStyle: { display: "flex", alignItems: "center" },
  };

  const [colDefs] = useState<any>([
    {
      field: "geraetename",
      headerName: "Device Name",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "geraetehersteller",
      headerName: "Manufacturer",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "geraeteid",
      headerName: "Device ID",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "geraeteidentnumber",
      headerName: "Device Number",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "geraeteart",
      headerName: "Type",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "search",
      headerName: "Search",
      flex: 0.6,
      minWidth: 100,
      cellRenderer: ShowProductsButton,
    },
  ]);

  return (
    <div className="h-full border-b">
      <AgGridReact
        rowHeight={50}
        ref={gridRef}
        loading={isFetchingEurasAppliances}
        loadingOverlayComponent={() => {
          return (
            <div className="flex flex-col items-center gap-2">
              <Loader size={30} color="oklch(70.7% 0.165 254.624)" />
              <small className="text-sm font-semibold text-neutral-500">
                Getting devices, please wait...
              </small>
            </div>
          );
        }}
        rowData={eurasAppliances}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        context={{
          searchQuery,
          eurasAppliances,
        }}
      />
    </div>
  );
}

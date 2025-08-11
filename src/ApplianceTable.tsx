import { AgGridReact } from "ag-grid-react";
import {
  type RowDoubleClickedEvent,
} from "ag-grid-community";
import { useEffect, useRef, useState } from "react";
import useAuthContext from "./hooks/useAuthContext";
import {
  useEurasAppliances,
  useEurasProductsByAppliances,
} from "./hooks/useEuras";
import useProductTableContext from "./hooks/useProductTableContext";

interface IApplianceTableProps {
  searchQuery: string
}

export default function ApplianceTable({ searchQuery }: IApplianceTableProps) {
  const { setRowData } = useProductTableContext();

  // const [deviceQuery, setDeviceQuery] = useState<string>('')
  const [anzahl] = useState("10");
  const [site] = useState<string>("1");
  const [deviceId, setDeviceId] = useState<string>("");

  const { user } = useAuthContext();

  const { eurasAppliances } = useEurasAppliances(
    searchQuery,
    anzahl,
    site,
    user!.token,
  );

  const { eurasProductsByAppliances, isSuccessEurasProductsByAppliances } =
    useEurasProductsByAppliances(searchQuery, deviceId, site, user!.token);

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
    // {
    //   field: "search",
    //   headerName: "Search Form",
    //   headerComponent: SearchForm,
    //   flex: 1.2,
    //   minWidth: 150,
    // },
  ]);

  useEffect(() => {
    if (eurasProductsByAppliances) {
      setRowData(eurasProductsByAppliances);
    }
  }, [isSuccessEurasProductsByAppliances, deviceId]);

  return (
    <div className="h-full border-b">
      <AgGridReact
        rowHeight={40}
        ref={gridRef}
        rowData={eurasAppliances}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        // context={{ deviceId, setDeviceId, searchQuery }}
        onRowDoubleClicked={(p: RowDoubleClickedEvent) => {
          setDeviceId(p.data.geraeteid);
        }}
      />
    </div>
  );
}

import { AgGridReact } from "ag-grid-react";
import {
  type CellClassParams,
  type ValueFormatterParams,
} from "ag-grid-community";
import { useEffect, useRef, useState } from "react";
import useAuthContext from "./hooks/useAuthContext";
import {
  useEurasAppliances,
  useEurasProductsByAppliances,
} from "./hooks/useEuras";
import useProductTableContext from "./hooks/useProductTableContext";

export default function ApplianceTable({ searchQuery }: any) {
  const { rowData, setRowData } = useProductTableContext();

  const [anzahl, setAnzahl] = useState("10");
  const [site, setSite] = useState<string>("1");
  const [geraeteid, setGeraeteid] = useState<string>("");

  const { user, dispatch } = useAuthContext();

  const { eurasAppliances } = useEurasAppliances(
    searchQuery,
    anzahl,
    site,
    user!.token,
  );

  const { eurasProductsByAppliances, isSuccessEurasProductsByAppliances } =
    useEurasProductsByAppliances(searchQuery, geraeteid, site, user!.token);

  console.log(
    "PRODUCTCTS 2 APPLIANCES",
    searchQuery,
    geraeteid,
    eurasProductsByAppliances,
  );

  const gridRef = useRef<AgGridReact>(null);

  const defaultColDef = {
    flex: 1,
    filter: true,
    sortable: true,
    resizable: true,
    cellStyle: { display: "flex", alignItems: "center" },
  };

  const [colDefs] = useState([
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
  ]);

  useEffect(() => {
    if (eurasProductsByAppliances) {
      setRowData(eurasProductsByAppliances);
    }
  }, [isSuccessEurasProductsByAppliances]);

  return (
    <div className="h-full border-b">
      <AgGridReact
        rowHeight={40}
        ref={gridRef}
        rowData={eurasAppliances}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        onRowDoubleClicked={(p: ValueFormatterParams) => {
          setGeraeteid(p.data.geraeteid);
        }}
        // suppressRowClickSelection={true}
        // rowSelection="multiple"
      />
    </div>
  );
}

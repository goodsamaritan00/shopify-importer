import { AgGridReact } from "ag-grid-react";
import { type RowDoubleClickedEvent } from "ag-grid-community";
import { useRef, useState } from "react";
import useAuthContext from "./hooks/useAuthContext";
import {
  useEurasAppliances,
} from "./hooks/useEuras";
import { useNavigate } from "react-router-dom";

interface IApplianceTableProps {
  searchQuery: string;
}

export default function ApplianceTable({ searchQuery }: IApplianceTableProps) {

  const [anzahl] = useState("10");
  const [site] = useState<string>("1");

  const { user } = useAuthContext();

  const { eurasAppliances } = useEurasAppliances(
    searchQuery,
    anzahl,
    site,
    user!.token,
  );

  const navigate = useNavigate();

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
  ]);

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
          if (p.data.geraeteid) {
            navigate("/products-by-appliances", {
              state: {
                deviceId: p.data.geraeteid,
                searchQuery,
              },
            });
          }
        }}
      />
    </div>
  );
}

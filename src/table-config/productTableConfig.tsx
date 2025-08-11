import type { CellClassParams, ValueFormatterParams } from "ag-grid-community";

import ImportSelectedButton from "../components/ag grid/ImportSelectedButton";
import HandleProduct from "../components/ag grid/HandleProduct";
import AvaliabilityStatus from "../components/ag grid/AvaliabilityStatus";
import ImportStatus from "../components/ag grid/ImportStatus";
import UpdateStatus from "../components/ag grid/UpdateStatus";

export const defaultProductColDefs = {
  flex: 1,
  filter: true,
  sortable: true,
  resizable: true,
  cellStyle: { display: "flex", alignItems: "center" },
};

export const productColDefs = [
  {
    field: "select",
    headerName: "Import",
    headerComponent: ImportSelectedButton,
    flex: 1.2,
    minWidth: 150,
    headerCheckboxSelection: true,
    checkboxSelection: true,
    filter: false,
    cellRenderer: HandleProduct,
  },
  {
    field: "thumbnailurl",
    headerName: "Image",
    flex: 1,
    minWidth: 80,
    maxWidth: 120,
    cellRenderer: (p: CellClassParams) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <img
          className="border border-neutral-400 h-[40px] rounded-md w-[40px] object-cover"
          src={p.data.thumbnailurl}
          alt="Product"
        />
      </div>
    ),
  },
  {
    field: "artikelbezeichnung",
    headerName: "Product Name",
    flex: 2.3,
    minWidth: 150,
    editable: true,
  },
  {
    field: "artikelnummer",
    headerName: "SKU",
    flex: 0.5,
    minWidth: 100,
  },
  {
    field: "originalnummer",
    headerName: "OEM",
    flex: 0.8,
    minWidth: 120,
  },
  {
    field: "artikelhersteller",
    headerName: "Manufacturer",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "vgruppenname",
    headerName: "Category",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "ekpreis",
    headerName: "Price",
    flex: 0.7,
    minWidth: 90,
    valueFormatter: (p: ValueFormatterParams) => p.value + "€",
  },
  {
    field: "bestellbar",
    headerName: "Available",
    flex: 0.8,
    minWidth: 100,
    cellRenderer: AvaliabilityStatus,
  },
  {
    field: "lieferzeit_in_tagen",
    headerName: "ETA",
    flex: 0.6,
    minWidth: 50,
    valueFormatter: (p: ValueFormatterParams) =>
      p.value.toLocaleString() + " days",
  },
  {
    field: "import",
    headerName: "Import status",
    flex: 1.3,
    minWidth: 140,
    cellRenderer: ImportStatus,
  },
  {
    field: "update",
    headerName: "Last Updated",
    flex: 1.3,
    minWidth: 140,
    cellRenderer: UpdateStatus,
  }
]
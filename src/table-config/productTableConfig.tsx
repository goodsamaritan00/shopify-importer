import type {
  CellClassParams,
  ValueFormatterParams,
} from "ag-grid-community";

import ImportSelectedButton from "../components/ag grid/ImportSelectedButton";
import HandleProduct from "../components/ag grid/HandleProduct";
import AvaliabilityStatus from "../components/ag grid/AvaliabilityStatus";
import ImportStatus from "../components/ag grid/ImportStatus";
import UpdateStatus from "../components/ag grid/UpdateStatus";

import noPhoto from "../assets/no-photo.jpg";
import ShopifyPrice from "../components/ag grid/ShopifyPrice";

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
    flex: 1.4,
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
    minWidth: 50,
    maxWidth: 110,
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
          src={p.data.thumbnailurl || noPhoto}
          alt="Product"
        />
      </div>
    ),
  },
  {
    field: "artikelbezeichnung",
    headerName: "Product Name",
    flex: 2,
    minWidth: 150,
    editable: true,
  },
  {
    field: "artikelnummer",
    headerName: "SKU",
    flex: 0.7,
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
    headerName: "ASWO Price",
    flex: 1,
    minWidth: 90,
    valueFormatter: (p: ValueFormatterParams) => p.value + "€",
  },
  {
    field: "shopify_price",
    headerName: "Shopify Price",
    flex: 1,
    minWidth: 90,
    editable: true,
    cellRenderer: ShopifyPrice,
  },
  {
    field: "bestellbar",
    headerName: "Available",
    flex: 0.8,
    minWidth: 100,
    cellRenderer: AvaliabilityStatus,
  },
  {
    field: "import",
    headerName: "Import status",
    flex: 1,
    minWidth: 140,
    cellRenderer: ImportStatus,
  },
  {
    field: "update",
    headerName: "Last Updated",
    flex: 1,
    minWidth: 140,
    cellRenderer: UpdateStatus,
  },
];

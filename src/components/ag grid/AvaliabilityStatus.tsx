import { type CellClassParams } from "ag-grid-community";

import Status from "./Status";

export default function AvaliabilityStatus(p: CellClassParams) {
  return (
    <div className="w-full h-full flex items-center ">
      {p.value === "J" ? (
        <Status status="imported">
          <span className="text-xs mx-auto">Avaliable</span>
        </Status>
      ) : (
        <Status status="notImported">
          <span className="text-xs mx-auto">Out of Stock</span>
        </Status>
      )}
    </div>
  );
}

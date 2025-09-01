import { type CellClassParams } from "ag-grid-community";

import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function ShowProductsButton(p: CellClassParams) {
  const searchQuery = p.context.searchQuery;
  const eurasAppliances = p.context.eurasAppliances;

  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        navigate("/products-by-appliances", {
          state: {
            deviceName: p.data.geraetename,
            deviceId: p.data.geraeteid,
            searchQuery,
            eurasAppliances,
          },
        });
      }}
      size="sm"
      className="text-xs h-[26px] rounded-sm"
    >
      Show Products
    </Button>
  );
}

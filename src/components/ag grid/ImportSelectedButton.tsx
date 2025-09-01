import { type CellClassParams } from "ag-grid-community";

import { Button } from "../ui/button";
import { useShopifyImport } from "../../hooks/useShopify";
import formatEurasToShopify from "../../utils/formatters/format-euras-to-shopify";
import useAuthContext from "../../hooks/useAuthContext";
import Loader from "../ui/loader";
import { toast } from "react-toastify";

export default function ImportSelectedButton(p: CellClassParams) {
  const { user } = useAuthContext();
  const { importProducts, isImporting } = useShopifyImport();

  const handleImportSelectedProducts = async () => {
    const selectedNodes = p.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node: any) => node.data);

    if (!user) {
      return;
    }

    try {
      await toast.promise(
        Promise.all(
          selectedData.map((product: any) => {
            return importProducts({
              data: formatEurasToShopify(product),
              token: user.token,
            });
          }),
        ),
        {
          pending: `Importing ${selectedData.length} products, please wait...`,
          success: `Successfuly imported ${selectedData.length} products to Shopify!`,
          error: "Something went wrong, please try again.",
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      size="sm"
      onClick={() => handleImportSelectedProducts()}
      className="w-full"
    >
      {isImporting ? <Loader color="#ffff" size={18} /> : "Import"}
    </Button>
  );
}

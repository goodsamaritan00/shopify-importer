import { Button } from "../ui/button";
import { useShopifyImport } from "../../hooks/useShopify";
import formatEurasToShopify from "../../utils/formatters/format-euras-to-shopify";
import useAuthContext from "../../hooks/useAuthContext";
import Loader from "../ui/loader";

export default function ImportSelectedButton(p: any) {
  const { user } = useAuthContext();
  const { importProducts, isImporting } = useShopifyImport(p.originalnummer);

  const handleImportSelectedProducts = async () => {
    const selectedNodes = p.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node: any) => node.data);

    if (!user) {
      return console.log("No User");
    }

    for (const product of selectedData) {
      importProducts({
        data: formatEurasToShopify(product),
        token: user.token,
      });
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

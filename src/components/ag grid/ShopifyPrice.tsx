import type { CellClassParams } from "ag-grid-community";
import { useImportedProducts } from "../../hooks/useShopify";
import useAuthContext from "../../hooks/useAuthContext";
import getImportedProducts from "../../utils/get-imported-products";


export default function ShopifyPrice(p: CellClassParams) {
  const { user } = useAuthContext();
  const { importedProducts } = useImportedProducts(user!.token);

  const importedProduct = getImportedProducts(p, importedProducts);
  const importedPrice = importedProduct?.variants?.[0]?.price;
  const editedPrice = p.data.shopify_price;

  // if user manually set price but product not yet imported
  if (editedPrice && !importedProduct && editedPrice !== "0.00") {
    return <span className="text-orange-300">{editedPrice}€</span>;
  }

  // if nothing set yet
  if (!importedProduct && !editedPrice) {
    return <span>0.00€</span>;
  }

  // if edited price differs from imported Shopify price
  if (
    editedPrice &&
    importedPrice &&
    editedPrice !== "0.00" &&
    editedPrice !== importedPrice
  ) {
    return <span className="text-orange-300">{editedPrice}€</span>;
  }

  // default → show Shopify imported price
  return (
    <span className={importedPrice === p.data.ekpreis ? "text-red-400" : ""}>
      {importedPrice ?? "0.00"}€
    </span>
  );
}

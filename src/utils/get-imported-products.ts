import type { IEurasProduct } from "../interfaces/IEuras";

const GetImportedProducts = (p: any, importedProducts: any) => {
  // Safely handle undefined or null input
  if (!importedProducts || !Array.isArray(importedProducts.products)) {
    return null;
  }

  const imported = importedProducts.products.find((product: any) => {
    return product.variants[0].sku === p.data.artikelnummer;
  });

  return imported || null;
};

export default GetImportedProducts;

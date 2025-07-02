import type { IEurasProduct } from "../interfaces/IEuras";

const productImportStatus = (product: IEurasProduct, imported: any) => {
  // If imported is not an object with a 'products' array, return false
  if (!imported || !Array.isArray(imported.products)) {
    return false;
  }

  // Check if any imported product matches the artikelnummer
  return imported.products.some(
    (importedProduct: any) =>
      importedProduct.variants?.[0]?.sku === product.artikelnummer,
  );
};

export default productImportStatus;

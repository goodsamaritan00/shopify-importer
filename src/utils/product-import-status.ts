import type { IEurasProduct } from "../interfaces/IEuras";

const productImportStatus = (product: IEurasProduct, imported: any) => {
  // If imported is not an object with a 'products' array, return false
  if (!imported || !Array.isArray(imported)) {
    return false;
  }

  // Check if any imported product matches the artikelnummer
  return imported.some((importedProduct: any) =>
    importedProduct.variants?.some(
      (variant: any) =>
        variant.sku?.trim().toLowerCase() ===
        product.artikelnummer?.trim().toLowerCase(),
    ),
  );
};

export default productImportStatus;

const getImportedProducts = (p: any, importedProducts: any) => {
  // Safely handle undefined or null input
  if (!importedProducts || !Array.isArray(importedProducts)) {
    return null;
  }

  const imported = importedProducts.find((product: any) => {
    return product.variants[0].sku === p.data.artikelnummer;
  });

  return imported || null;
};

export default getImportedProducts;

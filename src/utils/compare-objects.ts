function compareObjects(obj1: any, obj2: any) {
  const variant1 = obj1.variants?.[0];
  const variant2 = obj2.variants?.[0];

  // Safely normalize the price
  const normalizePrice = (price: any) => {
    if (typeof price === "number") return price;
    if (typeof price === "string") {
      return parseFloat(price.replace(",", ".").replace(/[^\d.]/g, ""));
    }
    return NaN;
  };

  const productTypeMatch = obj1.product_type === obj2.product_type;
  const skuMatch = variant1?.sku === variant2?.sku;
  const priceMatch =
    normalizePrice(variant1?.price) === normalizePrice(variant2?.price);

  return productTypeMatch && skuMatch && priceMatch;
}

export default compareObjects;

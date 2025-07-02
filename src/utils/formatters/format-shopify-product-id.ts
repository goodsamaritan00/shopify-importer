function formatShopifyProductId(gid: string) {
  const parts = gid.split("/");
  return parts.length > 0 ? parts[parts.length - 1] : null;
}

export default formatShopifyProductId;

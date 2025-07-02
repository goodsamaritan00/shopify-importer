import type { IEurasProduct } from "../../interfaces/IEuras";

const formatEurasToShopify = (product: IEurasProduct) => {
  const newPart = {
    title: product.artikelbezeichnung || "Ohne Titel",
    body_html: `
      <p><strong>Artikelnummer:</strong> ${product.artikelnummer}</p>
      <p><strong>Originalnummer:</strong> ${product.originalnummer}</p>
      <p><strong>Hersteller:</strong> ${product.artikelhersteller}</p>
      <p><strong>Lieferzeit:</strong> ${product.lieferzeit} (${product.lieferzeit_in_tagen} Tage)</p>
      <p><strong>Ersatzartikel:</strong> ${product.ersatzartikel || "Keine Angabe"}</p>
      <p><strong>Importeur:</strong> ${product.herstelleradresse?.importeur?.name || "Keine Angabe"}</p>
    `.trim(),
    vendor: "EURAS/ASWO",
    product_type: product.vgruppenname || "Allgemein",
    images: product.picurlbig?.startsWith("http")
      ? [
          {
            src: product.picurlbig,
          },
        ]
      : [],
    tags: [
      product.artikelnummer,
      product.ersatzartikel,
      product.lieferzeit,
      `${product.lieferzeit_in_tagen} Tage`,
    ]
      .filter(Boolean)
      .join(", "),
    variants: [
      {
        sku: product.artikelnummer,
        price: product.ekpreis,
        inventory_management: "shopify",
        inventory_policy: product.bestellbar === "J" ? "continue" : "deny",
        inventory_quantity: product.bestellbar === "J" ? 1 : 0,
      },
    ],
  };

  return newPart;
};

export default formatEurasToShopify;

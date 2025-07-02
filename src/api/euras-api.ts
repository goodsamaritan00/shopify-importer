import type { IEurasProduct } from "../interfaces/IEuras";
import cleanProductName from "../utils/formatters/format-euras-product-name";

const BASE_URL: string = "https://importer-be.onrender.com";

export const fetchEurasProducts = async (
  searchQuery: string,
  anzahl: string,
  siteQuery: string,
  token: string,
) => {
  try {
    const query = encodeURIComponent(searchQuery);

    const URL: string = `${BASE_URL}/routes/eurasProductSearch?suchbg=${query}&anzahl=${anzahl}&seite=${String(Number(siteQuery))}`;
    const AUTH_HEADERS: HeadersInit = {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const res = await fetch(URL, { headers: AUTH_HEADERS });
    const data = await res.json();
    console.log("DATA", data);
    const filterData: IEurasProduct[] = (
      Object.values(data.treffer) as IEurasProduct[]
    ).map((item: IEurasProduct) => {
      return {
        artikelnummer: item.artikelnummer,
        originalnummer: item.originalnummer,
        artikelbezeichnung: cleanProductName(
          item.artikelbezeichnung,
          item.artikelnummer,
          item.originalnummer,
        ),
        artikelhersteller: item.artikelhersteller,
        vgruppenname: item.vgruppenname,
        ekpreis: item.ekpreis,
        bestellbar: item.bestellbar,
        ersatzartikel: item.ersatzartikel,
        lieferzeit: item.lieferzeit,
        lieferzeit_in_tagen: item.lieferzeit_in_tagen,
        picurlbig: item.picurlbig || 'src/assets/no-photo.jpg',
        herstelleradresse: {
          hersteller: {
            name: item.herstelleradresse.hersteller.name,
            land: item.herstelleradresse.hersteller.land,
            email: item.herstelleradresse.hersteller.email,
            internet: item.herstelleradresse.hersteller.internet,
          },
          importeur: {
            name: item.herstelleradresse.importeur.name,
            land: item.herstelleradresse.importeur.land,
            email: item.herstelleradresse.importeur.email,
            internet: item.herstelleradresse.importeur.internet,
          },
        },
      };
    });

    const final = {
      siteNumbers: data.anzahlseiten,
      total: data.gesamtanzahltreffer,
      data: filterData,
    };

    return final;
  } catch (error) {
    console.log(error);
  }
};

// export const fetchEurasProductImages = async (productNumber) => {

// }

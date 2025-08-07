import type {
  IEurasProduct,
  IEurasProductsResponse,
} from "../interfaces/IEuras";
import extractProductData from "../utils/extract-euras-product";

const BASE_URL: string = "https://importer-be.onrender.com";

export const fetchEurasProducts = async (
  searchQuery: string,
  anzahl: string,
  siteQuery: string,
  token: string,
) => {
  try {
    const params = new URLSearchParams({
      seite: siteQuery,
      suchbg: searchQuery,
      anzahl: anzahl,
    });

    const URL: string = `${BASE_URL}/routes/eurasProductSearch?${params.toString()}`;
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
      return extractProductData(item);
    });

    const final: IEurasProductsResponse = {
      siteNumbers: data.anzahlseiten,
      total: data.gesamtanzahltreffer,
      data: filterData,
    };

    return final;
  } catch (error) {
    console.log(error);
  }
};

export const fetchEurasAppliances = async (
  searchQuery: string,
  anzahl: string,
  siteQuery: string,
  token: string,
) => {
  try {
    const params = new URLSearchParams({
      seite: siteQuery,
      suchbg: searchQuery,
      anzahl: anzahl,
    });

    const URL: string = `${BASE_URL}/routes/eurasAppliancesSearch?${params.toString()}`;
    const AUTH_HEADERS: HeadersInit = {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const res = await fetch(URL, { headers: AUTH_HEADERS });
    const data = await res.json();

    const final = Object.values(data.treffer);

    console.log("Appliances", final);

    return final;
  } catch (error) {
    console.log(error);
  }
};

export const fetchEurasProductsByAppliances = async (
  searchQuery: string,
  geraeteid: string,
  seite: string,
  token: string,
) => {
  try {
    const params = new URLSearchParams({
      seite: seite,
      suchbg: searchQuery,
      geraeteid: geraeteid,
    });
    console.log(params.toString());
    const URL: string = `${BASE_URL}/routes/eurasProductsByAppliances?${params.toString().replace(/\+/g, "%")}`;
    const AUTH_HEADERS: HeadersInit = {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const res = await fetch(URL, { headers: AUTH_HEADERS });
    const data = await res.json();
    console.log("PRODUCTS BY APPLIANCES", data);
    const filterData: IEurasProduct[] = (
      Object.values(data.treffer) as IEurasProduct[]
    ).map((item: IEurasProduct) => {
      return extractProductData(item);
    });

    console.log("PRODUCTS BY APPLIANCES HEHEHE", filterData);

    return filterData;
  } catch (error) {
    console.log(error);
  }
};

// export const fetchEurasProductImages = async (productNumber) => {

// }

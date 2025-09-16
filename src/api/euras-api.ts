import type {
  IEurasProduct,
  IEurasProductsResponse,
} from "../interfaces/IEuras";
import extractProductData from "../utils/extract-euras-product";
import authHeaders from "./utils/auth-headers";

const BASE_URL: string = "https://importer-be.onrender.com";

export const fetchEurasProducts = async (
  searchQuery: string,
  display: string,
  site: string,
  token: string,
) => {
  try {
    const params = new URLSearchParams({
      seite: site,
      suchbg: searchQuery,
      anzahl: display,
    });

    const URL: string = `${BASE_URL}/routes/eurasProductSearch?${params.toString()}`;

    const res = await fetch(URL, { headers: authHeaders(token) });
    const data = await res.json();

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
  } catch (error) {}
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

    const res = await fetch(URL, { headers: authHeaders(token) });
    const data = await res.json();

    const final = Object.values(data.treffer);
    return final;
  } catch (error) {}
};

export const fetchEurasProductsByAppliances = async (
  applianceId: string,
  site: string,
  token: string,
  searchQuery?: string,
  category?: string,
) => {
  try {
    const params = new URLSearchParams({
      seite: site,
      geraeteid: applianceId,
    });

    if (searchQuery) {
      params.delete("vgruppe"); // remove category
      params.set("suchbg", searchQuery);
    }

    if (category) {
      params.delete("suchbg"); // remove search
      params.set("vgruppe", category);
    }


    const URL: string = `${BASE_URL}/routes/eurasProductsByAppliances?${params.toString().replace(/\+/g, "%")}`;

    const res = await fetch(URL, { headers: authHeaders(token) });
    const data = await res.json();

    const filterData: IEurasProduct[] = (
      Object.values(data.treffer) as IEurasProduct[]
    ).map((item: IEurasProduct) => {
      return extractProductData(item);
    });

    const final: any = {
      total: data.anzahltreffer,
      data: filterData,
    };

    return final;
  } catch (error) {}
};

export const fetchEurasProductsByAppliancesCategory = async (
  categoryId: string,
  applianceId: string,
  site: string,
  token: string,
) => {
  try {
    const params = new URLSearchParams({
      seite: site,
      vgruppe: categoryId,
      geraeteid: applianceId,
    });

    const URL: string = `${BASE_URL}/routes/eurasProductsByAppliances?${params.toString().replace(/\+/g, "%")}`;

    const res = await fetch(URL, { headers: authHeaders(token) });
    const data = await res.json();

    const filterData: IEurasProduct[] = (
      Object.values(data.treffer) as IEurasProduct[]
    ).map((item: IEurasProduct) => {
      return extractProductData(item);
    });

    const final: any = {
      total: data.anzahltreffer,
      data: filterData,
    };

    return final;
  } catch (error) {}
};

export const fetchEurasApplianceCategories = async (
  deviceId: string,
  token: string,
) => {
  try {
    const params = new URLSearchParams({
      geraeteid: deviceId,
    });

    const URL: string = `${BASE_URL}/routes/eurasApplianceCategories?${params.toString()}`;

    const res = await fetch(URL, { headers: authHeaders(token) });
    const data = await res.json();

    const final = Object.values(data.treffer);
    return final;
  } catch (error) {}
};

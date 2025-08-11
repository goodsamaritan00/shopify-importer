import type {
  IEurasProduct,
  IEurasProductsResponse,
} from "../interfaces/IEuras";
import extractProductData from "../utils/extract-euras-product";
import authHeaders from "./utils/auth-headers";

const BASE_URL: string = "http://localhost:5000";

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
  } catch (error) {
    
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

    const res = await fetch(URL, { headers: authHeaders(token) });
    const data = await res.json();

    const final = Object.values(data.treffer);

    return final;
  } catch (error) {
  }
};

export const fetchEurasProductsByAppliances = async (
  searchQuery: string,
  applianceId: string,
  site: string,
  token: string,
) => {
  try {
    const params = new URLSearchParams({
      seite: site,
      suchbg: searchQuery,
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

    

    return filterData;
  } catch (error) {
    
  }
};

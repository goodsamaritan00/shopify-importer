import { fetchEurasProducts } from "../api/euras-api";
import { useQuery } from "@tanstack/react-query";
import useAuthContext from "./useAuthContext";
import type { IEurasProductsResponse } from "../interfaces/IEuras";

export default function useEurasProducts(
  searchQuery: string,
  displayNr: string,
  siteQuery: string,
  token: string,
) {
  const { user } = useAuthContext();

  const emptyEurasProducts: IEurasProductsResponse = {
    siteNumbers: 0,
    total: 0,
    data: [],
  };

  const {
    data: eurasProducts = emptyEurasProducts,
    isFetching: isFetchingEurasProducts,
    isError: isErrorEurasProducts,
    error: errorEurasProducts,
    refetch: refetchEurasProducts,
  } = useQuery({
    staleTime: 5 * 60 * 1000,
    queryKey: ["eurasProducts", displayNr, siteQuery, searchQuery, token],
    queryFn: () => {
      if (!user) throw new Error("User error, please sign in and try again.");
      return fetchEurasProducts(searchQuery, displayNr, siteQuery, token);
    },
  });

  return {
    eurasProducts,
    isFetchingEurasProducts,
    isErrorEurasProducts,
    errorEurasProducts,
    refetchEurasProducts,
  };
}

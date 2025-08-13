import {
  fetchEurasAppliances,
  fetchEurasProducts,
  fetchEurasProductsByAppliances,
} from "../api/euras-api";
import { useQuery } from "@tanstack/react-query";
import useAuthContext from "./useAuthContext";
import type { IEurasProductsResponse } from "../interfaces/IEuras";

export function useEurasProducts(
  searchQuery: string,
  displayNumber: string,
  siteNumber: string,
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
    isSuccess: isSuccessEurasProducts,
    isError: isErrorEurasProducts,
    error: errorEurasProducts,
    refetch: refetchEurasProducts,
  } = useQuery({
    staleTime: 5 * 60 * 1000,
    queryKey: ["eurasProducts", displayNumber, siteNumber, searchQuery, token],
    queryFn: () => {
      if (!user) throw new Error("User error, please sign in and try again.");
      return fetchEurasProducts(searchQuery, displayNumber, siteNumber, token);
    },
    enabled: !!searchQuery,
  });

  return {
    eurasProducts,
    isFetchingEurasProducts,
    isSuccessEurasProducts,
    isErrorEurasProducts,
    errorEurasProducts,
    refetchEurasProducts,
  };
}

export function useEurasAppliances(
  searchQuery: string,
  seite: string,
  anzahl: string,
  token: string,
) {
  const { user } = useAuthContext();

  const {
    data: eurasAppliances = [],
    isFetching: isFetchingEurasAppliances,
    isError: isErrorEurasAppliances,
    error: errorEurasAppliances,
    refetch: refetchEurasAppliances,
  } = useQuery({
    staleTime: 5 * 60 * 1000,
    queryKey: ["eurasAppliances", searchQuery, token],
    queryFn: () => {
      if (!user) throw new Error("User error, please sign in and try again.");
      return fetchEurasAppliances(searchQuery, seite, anzahl, token);
    },
  });

  return {
    eurasAppliances,
    isFetchingEurasAppliances,
    isErrorEurasAppliances,
    errorEurasAppliances,
    refetchEurasAppliances,
  };
}

export function useEurasProductsByAppliances(
  devicesQuery: string,
  geraeteid: string,
  seite: string,
  token: string,
) {
  const { user } = useAuthContext();

  const {
    data: eurasProductsByAppliances = [],
    isFetching: isFetchingEurasProductsByAppliances,
    isSuccess: isSuccessEurasProductsByAppliances,
    isError: isErrorEurasProductsByAppliances,
    error: errorEurasProductsByAppliances,
    refetch: refetchEurasProductsByAppliances,
  } = useQuery({
    staleTime: 5 * 60 * 1000,
    queryKey: [
      "eurasProductsByAppliances",
      devicesQuery,
      seite,
      token,
      geraeteid,
    ],
    queryFn: () => {
      if (!user) throw new Error("User error, please sign in and try again.");
      return fetchEurasProductsByAppliances(
        devicesQuery,
        geraeteid,
        seite,
        token,
      );
    },
    enabled: !!geraeteid,
  });

  return {
    eurasProductsByAppliances,
    isFetchingEurasProductsByAppliances,
    isSuccessEurasProductsByAppliances,
    isErrorEurasProductsByAppliances,
    errorEurasProductsByAppliances,
    refetchEurasProductsByAppliances,
  };
}

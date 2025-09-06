import {
  fetchEurasApplianceCategories,
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
    enabled: !!searchQuery,
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
  geraeteid: string,
  seite: string,
  token: string,
  devicesQuery?: string,
  category?: string,

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
      category,
      seite,
      token,
      geraeteid,
    ],
    queryFn: () => {
      if (!user) throw new Error("User error, please sign in and try again.");
      return fetchEurasProductsByAppliances(
        geraeteid,
        seite,
        token,
        devicesQuery,
        category,
      );
    },
  enabled: !!devicesQuery || !!category,
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

// export function useEurasProductsByAppliancesCategory(
//   devicesQuery: string,
//   geraeteid: string,
//   seite: string,
//   token: string,
// ) {
//   const { user } = useAuthContext();

//   const {
//     data: eurasProductsByAppliancesCategory = [],
//     isFetching: isFetchingEurasProductsByAppliancesCategory,
//     isSuccess: isSuccessEurasProductsByAppliancesCategory,
//     isError: isErrorEurasProductsByAppliancesCategory,
//     error: errorEurasProductsByAppliancesCategory,
//     refetch: refetchEurasProductsByAppliancesCategory,
//   } = useQuery({
//     staleTime: 5 * 60 * 1000,
//     queryKey: [
//       "eurasProductsByAppliancesCategory",
//       devicesQuery,
//       seite,
//       token,
//       geraeteid,
//     ],
//     queryFn: () => {
//       if (!user) throw new Error("User error, please sign in and try again.");
//       return fetchEurasProductsByAppliancesCategory(
//         devicesQuery,
//         geraeteid,
//         seite,
//         token,
//       );
//     },
//     enabled: !!geraeteid,
//   });

//   return {
//     eurasProductsByAppliancesCategory,
//     isFetchingEurasProductsByAppliancesCategory,
//     isSuccessEurasProductsByAppliancesCategory,
//     isErrorEurasProductsByAppliancesCategory,
//     errorEurasProductsByAppliancesCategory,
//     refetchEurasProductsByAppliancesCategory,
//   };
// }

export function useEurasApplianceCategories(geraeteid: string, token: string) {
  const { user } = useAuthContext();

  const {
    data: eurasApplianceCategories = [],
    isFetching: isFetchingEurasApplianceCategories,
    isSuccess: isSuccessEurasApplianceCategories,
    isError: isErrorEurasApplianceCategories,
    error: errorEurasApplianceCategories,
    refetch: refetchEurasApplianceCategories,
  } = useQuery({
    staleTime: 5 * 60 * 1000,
    queryKey: ["eurasApplianceCategories", token, geraeteid],
    queryFn: () => {
      if (!user) throw new Error("User error, please sign in and try again.");
      return fetchEurasApplianceCategories(geraeteid, token);
    },
    enabled: !!geraeteid,
  });

  return {
    eurasApplianceCategories,
    isFetchingEurasApplianceCategories,
    isSuccessEurasApplianceCategories,
    isErrorEurasApplianceCategories,
    errorEurasApplianceCategories,
    refetchEurasApplianceCategories,
  };
}

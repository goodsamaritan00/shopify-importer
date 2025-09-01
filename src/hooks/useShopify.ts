import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  deleteShopifyProduct,
  importShopifyProduct,
  fetchShopifyGraphQl,
  updateShopifyProduct,
  fetchImportedProducts,
} from "../api/shopify-api";

import { notifyError } from "../utils/toast-messages";

export function useShopifyImport() {
  const queryClient = useQueryClient();

  const {
    data: importedProducts = [],
    isPending: isImportingProduct,
    isError: isErrorImport,
    isSuccess: isSuccessImport,
    error: errorImport,
    mutateAsync: importProducts,
  } = useMutation({
    mutationFn: async (payload: { data: any; token: string }) =>
      importShopifyProduct(payload),
    onSuccess: (data) => {
      const product = data.product;

      queryClient.setQueryData(["productGraphQl", product.sku], {
        id: String(product.id),
        createdAt: product.created_at,
        updatedAt: product.updated_at,
      });
      queryClient.invalidateQueries({
        queryKey: ["productGraphQl", product.sku],
      });
      queryClient.invalidateQueries({ queryKey: ["importedProducts"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    importedProducts,
    isImporting: isImportingProduct,
    isErrorImport,
    errorImport,
    isSuccessImport,
    importProducts,
  };
}

export function useShopifyUpdate() {
  const queryClient = useQueryClient();

  const {
    isPending: isUpdatingProduct,
    isError: isErrorUpdate,
    error: errorUpdate,
    mutateAsync: updateProduct,
  } = useMutation({
    mutationFn: (payload: {
      id: string | null;
      data: any | null;
      token: string;
    }) => updateShopifyProduct(payload),
    onSuccess: (data) => {
      const product = data.product;

      queryClient.setQueryData(["productGraphQl"], {
        id: String(product.id),
        createdAt: product.created_at,
        updatedAt: product.updated_at,
      });
      queryClient.invalidateQueries({ queryKey: ["productGraphQl"] });
      queryClient.invalidateQueries({ queryKey: ["importedProducts"] });
    },
    onError: (error) => {
      notifyError(`Product update failed: ${error.message}`);
    },
  });

  return {
    isUpdatingProduct,
    isErrorUpdate,
    errorUpdate,
    updateProduct,
  };
}

export function useShopifyDelete() {
  const queryClient = useQueryClient();

  const {
    isPending: isDeletingProduct,
    isError: isErrorDelete,
    error: errorDelete,
    mutateAsync: deleteProduct,
  } = useMutation({
    mutationFn: (payload: { id: string | null; token: string }) =>
      deleteShopifyProduct(payload),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["productGraphQl"] });
      queryClient.invalidateQueries({ queryKey: ["importedProducts"] });
    },
    onError: (error) => {
      notifyError(`Failed to delete product! Please try again.`);
      console.log(error);
    },
  });

  return {
    isFetchingDelete: isDeletingProduct,
    isErrorDelete,
    error: errorDelete,
    deleteProduct,
  };
}

export function useShopifyGraphQl(sku: string | undefined, token: string) {
  const {
    data: productGraphQl,
    isFetching: isFetchingGraphQl,
    isError: isErrorGraphQl,
    error: errorGraphQl,
    refetch: refetchShopifyGraphQl,
  } = useQuery({
    queryKey: ["productGraphQl", sku],
    queryFn: () => fetchShopifyGraphQl(sku, token),
  });

  return {
    productGraphQl,
    isFetchingGraphQl,
    isErrorGraphQl,
    errorGraphQl,
    refetchShopifyGraphQl,
  };
}

export function useImportedProducts(token: string) {
  const {
    data: importedProducts,
    error: errorImportedProducts,
    isError: isErrorImportedProducts,
    isFetching: isFetchingImportedProducts,
    refetch: refecthImportedProducts,
  } = useQuery({
    queryKey: ["importedProducts"],
    queryFn: () => fetchImportedProducts(token),
    staleTime: 1000 * 60 * 5,
  });

  return {
    importedProducts,
    errorImportedProducts,
    isErrorImportedProducts,
    isFetchingImportedProducts,
    refecthImportedProducts,
  };
}

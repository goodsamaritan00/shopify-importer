// tanstack query
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// api
import {
  deleteShopifyProduct,
  importShopifyProduct,
  fetchShopifyGraphQl,
  updateShopifyProduct,
  fetchImportedProducts,
} from "../api/shopify-api";
// interfaces
//
// // utils
import { notifyError, notifySuccess } from "../utils/toast-messages";

export function useShopifyImport(sku: string) {
  const queryClient = useQueryClient();

  const {
    data: importedProducts = [],
    isPending: isImportingProduct,
    isError: isErrorImport,
    isSuccess: isSuccessImport,
    error: errorImport,
    mutate: importProducts,
  } = useMutation({
    mutationFn: (payload: { data: any; token: string }) =>
      importShopifyProduct(payload),
    onSuccess: (data) => {
      const product = data.product;
      queryClient.setQueryData(["productGraphQl", sku], {
        id: String(product.id),
        createdAt: product.created_at,
        updatedAt: product.updated_at,
      });
      queryClient.invalidateQueries({ queryKey: ["productGraphQl", sku] });
      queryClient.invalidateQueries({ queryKey: ["importedProducts"] });
      notifySuccess("Product imported to Shopify!");
    },
    onError: (error) => {
      notifyError(`Product import failed: ${error.message}`);
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

export function useShopifyUpdate(sku: string) {
  const queryClient = useQueryClient();

  const {
    isPending: isUpdatingProduct,
    isError: isErrorUpdate,
    error: errorUpdate,
    mutate: updateProduct,
  } = useMutation({
    mutationFn: (payload: { id: string | null; data: any | null; token: string }) =>
      updateShopifyProduct(payload),
    onSuccess: (data) => {
      const product = data.product;

      queryClient.setQueryData(["productGraphQl", sku], {
        id: String(product.id),
        createdAt: product.created_at,
        updatedAt: product.updated_at,
      });
      queryClient.invalidateQueries({ queryKey: ["productGraphQl", sku] });
      queryClient.invalidateQueries({ queryKey: ["importedProducts"] });

      notifySuccess("Product updated!");
    },
    onError: (error) => {
      console.log(error);
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

export function useShopifyDelete(sku: string) {
  const queryClient = useQueryClient();

  const {
    isPending: isDeletingProduct,
    isError: isErrorDelete,
    error: errorDelete,
    mutate: deleteProduct,
  } = useMutation({
    mutationFn: (payload: { id: string | null; token: string }) =>
      deleteShopifyProduct(payload),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["productGraphQl", sku] });
      queryClient.invalidateQueries({ queryKey: ["importedProducts"] });
      console.log("deleted");
      notifySuccess("Product deleted from Shopify!");
    },
    onError: (error) => {
      console.log(error);
      notifyError(`Failed to delete product: ${error.message}`);
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
  });

  return {
    importedProducts,
    errorImportedProducts,
    isErrorImportedProducts,
    isFetchingImportedProducts,
    refecthImportedProducts,
  };
}

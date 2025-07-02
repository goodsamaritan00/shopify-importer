import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifyError, notifySuccess } from "../utils/toast-messages";
import { updateShopifyProduct } from "../api/shopify-api";

export function useShopifyUpdate(sku: string) {
  const queryClient = useQueryClient();

  const {
    isPending: isUpdatingProduct,
    isError: isErrorUpdate,
    error: errorUpdate,
    mutate: updateProduct,
  } = useMutation({
    mutationFn: (payload: { id: string; data: any; token: string }) =>
      updateShopifyProduct(payload),
    onSuccess: (data) => {
      const product = data.product;

      queryClient.setQueryData(["productGraphQl", sku], {
        id: String(product.id),
        createdAt: product.created_at,
        updatedAt: product.updated_at,
      });
      queryClient.refetchQueries({ queryKey: ["productGraphQl", sku] });
      queryClient.refetchQueries({ queryKey: ["importedProducts"] });

      notifySuccess("Product updated!");
    },
    onError: (error: Error) => {
      if (error instanceof Error) {
        console.log(error);
        notifyError(`Product update failed: ${error.message}`);
      }
    },
  });

  return {
    isUpdatingProduct,
    isErrorUpdate,
    errorUpdate,
    updateProduct,
  };
}

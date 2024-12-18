import { useMutation } from '@tanstack/react-query';
import { useAxios } from '../hooks/useAxios';
import { Product } from '../types/product';

interface ProductMutationProps {
  onSuccess?: (data: Product | void) => void;
  onError?: (error: unknown) => void;
}

interface AddProductMutationProps {
  name: string;
  sku: string;
  description: string;
  barcode: string;
  weight: number;
  dimensions: string;
  category: string;
  manufacturer: string;
  originCountry: string;
}

type EditProductMutationProps = AddProductMutationProps & {
  productId: string;
};

interface ProductResponse {
  data: Product;
}

export function useAddProductMutation({
  onSuccess,
  onError,
}: ProductMutationProps = {}) {
  const axios = useAxios();
  return useMutation({
    mutationKey: ['addProduct'],
    mutationFn: async ({
      name,
      sku,
      description,
      barcode,
      weight,
      dimensions,
      category,
      manufacturer,
      originCountry,
    }: AddProductMutationProps) => {
      const { data } = await axios.post<ProductResponse>('item', {
        name,
        sku,
        description,
        barcode,
        weight,
        dimensions,
        category,
        manufacturer,
        originCountry,
      });
      return data.data;
    },
    onSuccess,
    onError,
  });
}

export function useEditProductMutation({
  onSuccess,
  onError,
}: ProductMutationProps = {}) {
  const axios = useAxios();
  return useMutation({
    mutationKey: ['editProduct'],
    mutationFn: async ({
      name,
      sku,
      description,
      barcode,
      weight,
      dimensions,
      category,
      manufacturer,
      originCountry,
      productId,
    }: EditProductMutationProps) => {
      const { data } = await axios.put<ProductResponse>(`item/${productId}`, {
        name,
        sku,
        description,
        barcode,
        weight,
        dimensions,
        category,
        manufacturer,
        originCountry,
      });
      return data.data;
    },
    onSuccess,
    onError,
  });
}

export function useDeleteProductMutation({
  onSuccess,
  onError,
}: ProductMutationProps = {}) {
  const axios = useAxios();
  return useMutation({
    mutationKey: ['deleteProduct'],
    mutationFn: async ({ productId }: { productId: string }) => {
      await axios.delete(`item/${productId}`);
    },
    onSuccess,
    onError,
  });
}

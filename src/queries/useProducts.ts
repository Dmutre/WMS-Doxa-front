import { useQuery } from '@tanstack/react-query';
import { useAxios } from '../hooks/useAxios';
import { Product } from '../types/product';

interface UserEventQueryProps {
  name?: string;
  sku?: string;
  category?: boolean;
  manufacturer?: string;
  originCountry?: string;
  orderBy?: string;
  orderDirection?: string;
  enabled?: boolean;
  page?: number;
  pageSize?: number;
}

export function useProductsQuery({
  name,
  sku,
  category,
  manufacturer,
  originCountry,
  orderBy,
  orderDirection,
  enabled,
  page,
  pageSize,
}: UserEventQueryProps = {}) {
  const axios = useAxios();
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axios.get<Product[]>('item', {
        params: {
          name,
          sku,
          category,
          manufacturer,
          originCountry,
          orderBy,
          orderDirection,
          page,
          pageSize,
        },
      });
      return data;
    },
    enabled,
  });
}

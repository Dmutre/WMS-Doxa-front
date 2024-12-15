import { useQuery } from '@tanstack/react-query';
import { useAxios } from '../hooks/useAxios';
import { Batch } from '../types/batch';

interface UserEventQueryProps {
  warehouseId?: string;
  itemId?: string;
  isReserved?: boolean;
  row?: number;
  shelf?: number;
  position?: number;
  orderBy?: string;
  orderDirection?: string;
  enabled?: boolean;
  page?: number;
  pageSize?: number;
}

interface BatchResponse {
  data: Batch[];
  total: number;
}

export function useBatchesQuery({
  warehouseId,
  itemId,
  isReserved,
  row,
  shelf,
  position,
  orderBy,
  orderDirection,
  enabled,
  page = 1,
  pageSize = 10,
}: UserEventQueryProps = {}) {
  const axios = useAxios();
  return useQuery({
    queryKey: ['batch'],
    queryFn: async () => {
      const { data } = await axios.get<BatchResponse>('batch', {
        params: {
          warehouseId,
          itemId,
          isReserved,
          row,
          shelf,
          position,
          orderBy,
          orderDirection,
          page,
          pageSize,
        },
      });
      console.log('data2', data);
      return data.data;
    },
    enabled,
  });
}

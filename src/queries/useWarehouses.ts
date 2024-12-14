import { useQuery } from '@tanstack/react-query';
import { useAxios } from '../hooks/useAxios';
import { Warehouse } from '../types/warehouse';

interface WarehouseQueryProps {
  enabled?: boolean;
}

interface WarehousesResponse {
  data: Warehouse[];
  total: number;
}

export function useWarehousesQuery({ enabled }: WarehouseQueryProps = {}) {
  const axios = useAxios();
  return useQuery({
    queryKey: ['warehouses'],
    queryFn: async () => {
      const { data } = await axios.get<WarehousesResponse>('warehouse', {
        params: {
          page: 1,
          pageSize: 10,
        },
      });
      return data.data;
    },
    enabled,
  });
}

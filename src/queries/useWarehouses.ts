import { useQuery } from '@tanstack/react-query';
import { useAxios } from '../hooks/useAxios';
import { Warehouse } from '../types/warehouse';

interface UserEventQueryProps {
  enabled?: boolean;
}

export function useWarehousesQuery({ enabled }: UserEventQueryProps = {}) {
  const axios = useAxios();
  return useQuery({
    queryKey: ['warehouses'],
    queryFn: async () => {
      const { data } = await axios.get<Warehouse[]>('warehouse', {
        params: {
          page: 1,
          pageSize: 10,
        },
      });
      return data;
    },
    enabled,
  });
}

import { useQuery } from '@tanstack/react-query';
import { useAxios } from '../hooks/useAxios';
import { Role } from '../types/role';

interface RolesQueryProps {
  name?: string;
  page: number;
  pageSize: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}

interface GetRolesResponse {
  data: Role[];
  total: number;
}

export const useRolesQuery = (params: RolesQueryProps) => {
  const axios = useAxios();
  return useQuery({
    queryKey: ['roles', params],
    queryFn: async () => {
      const { data } = await axios.get<GetRolesResponse>('roles', {
        params: params,
      });
      return data;
    },
  });
};

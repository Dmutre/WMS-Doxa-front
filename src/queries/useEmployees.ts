import { useQuery } from '@tanstack/react-query';
import { useAxios } from '../hooks/useAxios';
import { Employee, USER_STATUS } from '../types/employee';

interface EmployeesQueryProps {
  email?: string;
  firstName?: string;
  lastName?: string;
  status?: USER_STATUS;
  roleId?: string;
  page: number;
  pageSize: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}

interface GetEmployeesResponse {
  data: Employee[];
  total: number;
}

export const useEmployeesQuery = (params: EmployeesQueryProps) => {
  const axios = useAxios();
  return useQuery({
    queryKey: ['employees', params],
    queryFn: async () => {
      const { data } = await axios.get<GetEmployeesResponse>('users', {
        params: params,
      });
      return data;
    },
  });
};

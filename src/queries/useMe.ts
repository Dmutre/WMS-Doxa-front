import { useQuery } from '@tanstack/react-query';
import { useAxios } from '../hooks/useAxios';
import { Employee } from '../types/employee';

export const useMe = () => {
  const axios = useAxios();
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const { data } = await axios.get<Employee>('auth/me');
      return data;
    },
  });
};

import { Task } from '../types/task';
import { useAxios } from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

interface GetEmployeesResponse {
  data: Task[];
  total: number;
}

interface TasksQueryProps {
  page: number;
  pageSize: number;
  assigneeId?: string;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}

const defaultParams: TasksQueryProps = {
  page: 1,
  pageSize: 10,
};

export const useTasksQuery = (params: TasksQueryProps = defaultParams) => {
  const axios = useAxios();
  return useQuery({
    queryKey: ['tasks', params.page, params.pageSize, params.assigneeId],
    queryFn: async () => {
      const { data } = await axios.get<GetEmployeesResponse>('tasks', {
        params: params,
      });
      return data;
    },
  });
};

export const useGetTaskByIdQuery = (id: string) => {
  const axios = useAxios();
  return useQuery({
    queryKey: ['task', id],
    queryFn: async () => {
      const { data } = await axios.get<Task>(`tasks/${id}`);
      return data;
    },
  });
};

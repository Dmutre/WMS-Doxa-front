import { useMutation } from '@tanstack/react-query';
import { useAxios } from '../hooks/useAxios';

interface UseDeleteTaskMutationProps {
  onSuccess?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError?: (error: any) => void;
}

export const useDeleteTaskMutation = ({
  onSuccess,
  onError,
}: UseDeleteTaskMutationProps) => {
  const axios = useAxios();
  return useMutation({
    mutationKey: ['deleteTask'],
    mutationFn: async (id: string) => {
      await axios.delete(`tasks/${id}`);
    },
    onSuccess,
    onError,
  });
};

interface CreateTaskDTO {
  title: string;
  description: string;
  priority: number;
  estimate: number;
  startDate: string;
  dueDate: string;
}

export const useCreateTaskMutation = ({
  onSuccess,
  onError,
}: UseDeleteTaskMutationProps = {}) => {
  const axios = useAxios();
  return useMutation({
    mutationKey: ['createTask'],
    mutationFn: async (data: CreateTaskDTO) => {
      await axios.post('tasks', data);
    },
    onSuccess,
    onError,
  });
};

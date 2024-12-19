import { useMutation } from '@tanstack/react-query';
import { useAxios } from '../hooks/useAxios';

interface UseDeleteTaskMutationProps {
  onSuccess?: () => void;
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

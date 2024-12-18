import { useMutation } from '@tanstack/react-query';
import { useAxios } from '../hooks/useAxios';
import { Batch } from '../types/batch';

interface BatchMutationProps {
  onSuccess?: (data: Batch | void) => void;
  onError?: (error: unknown) => void;
}

interface AddBatchMutationProps {
  itemId: string;
  warehouseId: string;
  quantity: number;
}

type EditBatchMutationProps = AddBatchMutationProps & {
  batchId: string;
};

interface BatchResponse {
  data: Batch | void;
}

export function useAddBatchMutation({
  onSuccess,
  onError,
}: BatchMutationProps = {}) {
  const axios = useAxios();
  return useMutation({
    mutationKey: ['addBatch'],
    mutationFn: async ({
      itemId,
      warehouseId,
      quantity,
    }: AddBatchMutationProps) => {
      const { data } = await axios.post<BatchResponse>('batch', {
        itemId,
        warehouseId,
        quantity,
      });
      return data.data;
    },
    onSuccess,
    onError,
  });
}

export function useEditBatchMutation({
  onSuccess,
  onError,
}: BatchMutationProps = {}) {
  const axios = useAxios();
  return useMutation({
    mutationKey: ['editBatch'],
    mutationFn: async ({
      itemId,
      warehouseId,
      quantity,
      batchId,
    }: EditBatchMutationProps) => {
      const { data } = await axios.put<BatchResponse>(`batch/${batchId}`, {
        itemId,
        warehouseId,
        quantity,
      });
      return data.data;
    },
    onSuccess,
    onError,
  });
}

export function useDeleteBatchMutation({
  onSuccess,
  onError,
}: BatchMutationProps = {}) {
  const axios = useAxios();
  return useMutation({
    mutationKey: ['deleteBatch'],
    mutationFn: async ({ batchId }: { batchId: string }) => {
      await axios.delete(`batch/${batchId}`);
    },
    onSuccess,
    onError,
  });
}

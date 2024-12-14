import { useMutation } from '@tanstack/react-query';
import { useAxios } from '../hooks/useAxios';
import { Warehouse } from '../types/warehouse';

interface useAddWarehouseMutationProps {
  onSuccess?: (data: Warehouse) => void;
  onError?: (error: any) => void;
}

interface AddWarehouseMutationProps {
  name: string;
  type: string;
  address: string;
  coordinates: string;
  notes: string;
  area: number;
  isActive: boolean;
  photo: string;
}

interface WarehousesResponse {
  data: Warehouse;
}

export function useAddWarehouseMutation({
  onSuccess,
  onError,
}: useAddWarehouseMutationProps = {}) {
  const axios = useAxios();
  return useMutation({
    mutationKey: ['addWarehouse'],
    mutationFn: async ({
      name,
      type,
      address,
      coordinates,
      notes,
      area,
      isActive,
      photo,
    }: AddWarehouseMutationProps) => {
      const { data } = await axios.post<WarehousesResponse>('warehouse', {
        name,
        type,
        address,
        coordinates,
        notes,
        area,
        isActive,
        photo,
      });
      return data.data;
    },
    onSuccess,
    onError,
  });
}

import { useMutation } from '@tanstack/react-query';
import { useAxios } from '../hooks/useAxios';
import { Warehouse } from '../types/warehouse';

interface WarehouseMutationProps {
  onSuccess?: (data: Warehouse | void) => void;
  onError?: (error: unknown) => void;
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

type EditWarehouseMutationProps = AddWarehouseMutationProps & {
  warehouseId: string;
};

interface WarehousesResponse {
  data: Warehouse;
}

export function useAddWarehouseMutation({
  onSuccess,
  onError,
}: WarehouseMutationProps = {}) {
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

export function useEditWarehouseMutation({
  onSuccess,
  onError,
}: WarehouseMutationProps = {}) {
  const axios = useAxios();
  return useMutation({
    mutationKey: ['editWarehouse'],
    mutationFn: async ({
      name,
      type,
      address,
      coordinates,
      notes,
      area,
      isActive,
      photo,
      warehouseId,
    }: EditWarehouseMutationProps) => {
      const { data } = await axios.put<WarehousesResponse>(
        `warehouse/${warehouseId}`,
        {
          name,
          type,
          address,
          coordinates,
          notes,
          area,
          isActive,
          photo,
        }
      );
      return data.data;
    },
    onSuccess,
    onError,
  });
}

export function useDeleteWarehouseMutation({
  onSuccess,
  onError,
}: WarehouseMutationProps = {}) {
  const axios = useAxios();
  return useMutation({
    mutationKey: ['deleteWarehouse'],
    mutationFn: async ({ warehouseId }: { warehouseId: string }) => {
      await axios.delete(`warehouse/${warehouseId}`);
    },
    onSuccess,
    onError,
  });
}

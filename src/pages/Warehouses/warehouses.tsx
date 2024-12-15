import { useDeleteWarehouseMutation } from '../../mutations/warehouse';
import { useWarehousesQuery } from '../../queries/useWarehouses';
import { WarehouseModal } from './components/Modal';
import { WarehouseComponent } from './components/Warehouse';
import styles from './warehouses.module.css';
import { useState } from 'react';

export const Warehouses = () => {
  const { data: warehouses, refetch } = useWarehousesQuery();
  const [open, setOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<string | false>(false);
  const { mutate: deleteWarehouse } = useDeleteWarehouseMutation({
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      alert('Something went wrong');
    },
  });

  const handleOpenCreateWarehouseModal = () => {
    refetch();
    setOpen(true);
    setIsEditing(false);
  };

  const handleOpenEditWarehouseModal = (warehouseId: string) => {
    refetch();
    setOpen(true);
    setIsEditing(warehouseId);
  };

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <h1>Warehouses</h1>
        <button
          className={styles['addButton']}
          onClick={handleOpenCreateWarehouseModal}
        >
          Add Warehouse
        </button>
      </div>
      <div className={styles['warehouses']}>
        {warehouses?.length && warehouses.length > 0 ? (
          warehouses.map(warehouse => (
            <WarehouseComponent
              warehouse={warehouse}
              editWarehouse={handleOpenEditWarehouseModal}
              deleteWarehouse={() =>
                deleteWarehouse({ warehouseId: warehouse.id })
              }
            />
          ))
        ) : (
          <div>No warehouses found</div>
        )}
      </div>
      <WarehouseModal
        open={open}
        isEditing={isEditing}
        refetch={refetch}
        setOpen={setOpen}
      />
    </div>
  );
};

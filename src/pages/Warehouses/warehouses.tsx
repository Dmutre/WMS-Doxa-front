import { useWarehousesQuery } from '../../queries/useWarehouses';
import { WarehouseModal } from './components/Modal';
import { WarehouseComponent } from './components/Warehouse';
import styles from './warehouses.module.css';
import { useState } from 'react';

export const Warehouses = () => {
  const { data: warehouses } = useWarehousesQuery();
  const [open, setOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<string | false>(false);

  const handleOpenCreateWarehouseModal = () => {
    setOpen(true);
    setIsEditing(false);
  };

  const handleOpenEditWarehouseModal = (warehouseId: string) => {
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
            />
          ))
        ) : (
          <div>No warehouses found</div>
        )}
      </div>
      <WarehouseModal open={open} isEditing={isEditing} setOpen={setOpen} />
    </div>
  );
};

import { Button } from '@mui/material';
import { Warehouse } from '../../../types/warehouse';
import { router } from '../../../app/Router';
import styles from './Warehouse.module.css';

interface WarehouseProps {
  warehouse: Warehouse;
  editWarehouse: (warehouseId: string) => void;
}

export const WarehouseComponent = ({
  warehouse,
  editWarehouse,
}: WarehouseProps) => {
  return (
    <div className={styles['container']}>
      <h1>{warehouse.name}</h1>
      <p>location: {warehouse.address}</p>
      <div className={styles['buttons']}>
        <Button
          variant="contained"
          onClick={async () => {
            await router.navigate(`${warehouse.id}`);
          }}
        >
          View Details
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            editWarehouse(warehouse.id);
          }}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

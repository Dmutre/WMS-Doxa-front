import { Button } from '@mui/material';
import { Warehouse } from '../../../types/warehouse';
import { router } from '../../../app/Router';
import styles from './Warehouse.module.css';

interface WarehouseProps {
  warehouse: Warehouse;
}

export const WarehouseComponent = ({ warehouse }: WarehouseProps) => {
  return (
    <div className={styles['container']}>
      <h1>{warehouse.name}</h1>
      <p>location: {warehouse.location}</p>
      <p>items: {warehouse.items.length}</p>
      <Button
        variant="contained"
        onClick={async () => {
          await router.navigate(`warehouses/${warehouse.id}`);
        }}
      >
        View Details
      </Button>
    </div>
  );
};

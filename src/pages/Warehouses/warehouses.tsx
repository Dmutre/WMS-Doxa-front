import { useWarehousesQuery } from '../../queries/useWarehouses';
import { WarehouseComponent } from './components/Warehouse';
import styles from './warehouses.module.css';

export const Warehouses = () => {
  const { data: warehouses } = useWarehousesQuery();

  return (
    <div className={styles['container']}>
      {warehouses?.length && warehouses.length > 0 ? (
        warehouses.map(warehouse => (
          <WarehouseComponent warehouse={warehouse} />
        ))
      ) : (
        <div>No warehouses found</div>
      )}
    </div>
  );
};

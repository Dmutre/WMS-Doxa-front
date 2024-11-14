import { Warehouse } from '../../types/warehouse';
import { WarehouseComponent } from './components/Warehouse';
import styles from './warehouses.module.css';

export const Warehouses = () => {
  const mockedWarehouses: Warehouse[] = [
    {
      id: 1,
      name: 'Warehouse 1',
      location: 'Warehouse 1',
      items: [
        {
          id: 1,
          name: 'Item 1',
          price: 100,
          warehouseId: 1,
        },
        {
          id: 2,
          name: 'Item 2',
          price: 200,
          warehouseId: 1,
        },
        {
          id: 3,
          name: 'Item 3',
          price: 300,
          warehouseId: 1,
        },
      ],
    },
    {
      id: 2,
      name: 'Warehouse 2',
      location: 'Warehouse 2',
      items: [
        {
          id: 1,
          name: 'Item 1',
          price: 100,
          warehouseId: 2,
        },
        {
          id: 2,
          name: 'Item 2',
          price: 200,
          warehouseId: 2,
        },
        {
          id: 3,
          name: 'Item 3',
          price: 300,
          warehouseId: 2,
        },
      ],
    },
  ];
  return (
    <div className={styles['container']}>
      {mockedWarehouses.map(warehouse => (
        <WarehouseComponent warehouse={warehouse} />
      ))}
    </div>
  );
};

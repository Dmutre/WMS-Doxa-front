import { Button, Modal, TextField } from '@mui/material';
import { useWarehousesQuery } from '../../queries/useWarehouses';
import { WarehouseComponent } from './components/Warehouse';
import styles from './warehouses.module.css';
import { useState } from 'react';
import { useAddWarehouseMutation } from '../../mutations/warehouse';

export const Warehouses = () => {
  const { data: warehouses } = useWarehousesQuery();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [open, setOpen] = useState(false);

  const { mutate: addWarehouse } = useAddWarehouseMutation({
    onSuccess: () => {
      setOpen(false);
      setName('');
      setAddress('');
    },
    onError: () => {
      alert('Something went wrong');
    },
  });

  const handleAddWarehouse = async () => {
    addWarehouse({
      name,
      address,
      type: 'Warehouse',
      coordinates: '-122.4194,37.7749',
      notes: 'This is a test warehouse',
      area: 100,
      isActive: true,
      photo: 'test',
    });
  };

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <h1>Warehouses</h1>
        <button className={styles['addButton']} onClick={() => setOpen(true)}>
          Add Warehouse
        </button>
      </div>
      <div className={styles['warehouses']}>
        {warehouses?.length && warehouses.length > 0 ? (
          warehouses.map(warehouse => (
            <WarehouseComponent warehouse={warehouse} />
          ))
        ) : (
          <div>No warehouses found</div>
        )}
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div
          className={styles['addWarehouseModalContainer']}
          onClick={() => setOpen(false)}
        >
          <div
            className={styles['addWarehouseModal']}
            onClick={e => e.stopPropagation()}
          >
            <h1>Add Warehouse</h1>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <TextField
              name="Address"
              label="Address"
              variant="outlined"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
            <Button variant="contained" onClick={handleAddWarehouse}>
              Add
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

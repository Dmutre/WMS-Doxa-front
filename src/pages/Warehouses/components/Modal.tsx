import { Button, Modal, TextField } from '@mui/material';
import { useState } from 'react';
import styles from './Modal.module.css';
import {
  useAddWarehouseMutation,
  useEditWarehouseMutation,
} from '../../../mutations/warehouse';

export const WarehouseModal = ({
  open,
  isEditing,
  setOpen,
}: {
  open: boolean;
  isEditing: false | string;
  setOpen: (open: boolean) => void;
}) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const action = isEditing ? 'Edit' : 'Add';

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

  const { mutate: editWarehouse } = useEditWarehouseMutation({
    onSuccess: () => {
      setOpen(false);
      setName('');
      setAddress('');
    },
    onError: () => {
      alert('Something went wrong');
    },
  });

  const handleSubmit = async () => {
    if (isEditing) {
      editWarehouse({
        name,
        address,
        type: 'Warehouse',
        coordinates: '-122.4194,37.7749',
        notes: 'This is a test warehouse',
        area: 100,
        isActive: true,
        photo: 'test',
        warehouseId: isEditing,
      });
      return;
    }

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
    <Modal open={open !== false} onClose={() => setOpen(false)}>
      <div
        className={styles['addWarehouseModalContainer']}
        onClick={() => setOpen(false)}
      >
        <div
          className={styles['addWarehouseModal']}
          onClick={e => e.stopPropagation()}
        >
          <h1>{action} Warehouse</h1>
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
          <Button variant="contained" onClick={handleSubmit}>
            {action}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

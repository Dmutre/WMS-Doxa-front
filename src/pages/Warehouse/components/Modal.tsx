import {
  Button,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import styles from './Modal.module.css';
import {
  useAddWarehouseMutation,
  useEditWarehouseMutation,
} from '../../../mutations/warehouse';

export const AddProductToWarehouseModal = ({
  open,
  isEditing,
  refetch,
  setOpen,
}: {
  open: boolean;
  isEditing: false | string;
  refetch: () => void;
  setOpen: (open: boolean) => void;
}) => {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');

  const action = isEditing ? 'Edit' : 'Add';

  const { mutate: addWarehouse } = useAddWarehouseMutation({
    onSuccess: () => {
      refetch();
      setOpen(false);
      setProduct('');
      setQuantity('');
    },
    onError: () => {
      alert('Something went wrong');
    },
  });

  const { mutate: editWarehouse } = useEditWarehouseMutation({
    onSuccess: () => {
      setOpen(false);
      setProduct('');
      setQuantity('');
    },
    onError: () => {
      alert('Something went wrong');
    },
  });

  const handleSubmit = async () => {
    if (isEditing) {
      editWarehouse({
        name: product,
        address: quantity,
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
      name: product,
      address: quantity,
      type: 'Warehouse',
      coordinates: '-122.4194,37.7749',
      notes: 'This is a test warehouse',
      area: 100,
      isActive: true,
      photo: 'test',
    });
  };

  const handleProductChange = (event: SelectChangeEvent<HTMLInputElement>) => {
    setProduct(event.target.value as string);
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
          <h1>Add Product to Warehouse</h1>
          <InputLabel id="name-label">Product</InputLabel>
          <Select
            labelId="name-label"
            name="Product"
            onChange={handleProductChange}
            label="Product"
          >
            <MenuItem value="John">John</MenuItem>
            <MenuItem value="Jane">Jane</MenuItem>
            <MenuItem value="Doe">Doe</MenuItem>
          </Select>
          <TextField
            name="Quantity"
            label="Quantity"
            variant="outlined"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            type="number"
          />
          <Button variant="contained" onClick={handleSubmit}>
            {action}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

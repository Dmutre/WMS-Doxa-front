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
import { Product } from '../../../types/product';

export const AddProductToWarehouseModal = ({
  open,
  isEditing,
  notAddedProducts,
  refetch,
  setOpen,
}: {
  open: boolean;
  isEditing: false | string;
  notAddedProducts: Product[] | undefined;
  refetch: () => void;
  setOpen: (open: boolean) => void;
}) => {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');

  const [isCreatingAProduct, setIsCreatingAProduct] = useState(false);
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [description, setDescription] = useState('');
  const [barcode, setBarcode] = useState('');
  const [weight, setWeight] = useState(0);
  const [dimensions, setDimensions] = useState('');
  const [category, setCategory] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [originCountry, setOriginCountry] = useState('');

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
        onClick={() => {
          setOpen(false);
          setIsCreatingAProduct(false);
        }}
      >
        <div
          className={styles['addWarehouseModal']}
          onClick={e => e.stopPropagation()}
        >
          {!isCreatingAProduct && (
            <>
              <h1>Add Product to Warehouse</h1>
              <InputLabel id="name-label">Product</InputLabel>
              <div className={styles['select-container']}>
                <Select
                  className={styles['select']}
                  labelId="name-label"
                  name="Product"
                  onChange={handleProductChange}
                  label="Product"
                >
                  {notAddedProducts?.map(product => (
                    <MenuItem value={product.id} key={product.id}>
                      {product.name}
                    </MenuItem>
                  ))}
                  <MenuItem value="John">John</MenuItem>
                  <MenuItem value="Jane">Jane</MenuItem>
                  <MenuItem value="Doe">Doe</MenuItem>
                </Select>
                <Button
                  onClick={() => setIsCreatingAProduct(true)}
                  className={styles['add-button']}
                  variant="contained"
                >
                  +
                </Button>
              </div>
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
            </>
          )}
          {isCreatingAProduct && (
            <>
              <h1>Create a Product</h1>
              <TextField
                name="Name"
                label="Name"
                variant="outlined"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <TextField
                name="sku"
                label="sku"
                variant="outlined"
                value={sku}
                onChange={e => setSku(e.target.value)}
                type="number"
              />
              <TextField
                name="Description"
                label="Description"
                variant="outlined"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <TextField
                name="Barcode"
                label="Barcode"
                variant="outlined"
                value={barcode}
                onChange={e => setBarcode(e.target.value)}
              />
              <TextField
                name="Weight"
                label="Weight"
                variant="outlined"
                value={weight}
                onChange={e => setWeight(Number(e.target.value))}
                type="number"
              />
              <TextField
                name="Dimensions"
                label="Dimensions"
                variant="outlined"
                value={dimensions}
                onChange={e => setDimensions(e.target.value)}
              />
              <TextField
                name="Category"
                label="Category"
                variant="outlined"
                value={category}
                onChange={e => setCategory(e.target.value)}
              />
              <TextField
                name="Manufacturer"
                label="Manufacturer"
                variant="outlined"
                value={manufacturer}
                onChange={e => setManufacturer(e.target.value)}
              />
              <TextField
                name="Origin Country"
                label="Origin Country"
                variant="outlined"
                value={originCountry}
                onChange={e => setOriginCountry(e.target.value)}
              />
              <Button variant="contained" onClick={handleSubmit}>
                Create
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

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
import { Product } from '../../../types/product';
import { useAddProductMutation } from '../../../mutations/products';
import {
  useAddBatchMutation,
  useEditBatchMutation,
} from '../../../mutations/batches';

export const AddProductToWarehouseModal = ({
  open,
  isEditing,
  notAddedProducts,
  warehouseId,
  refetch,
  closeModal,
}: {
  open: boolean;
  isEditing: string | false;
  notAddedProducts: Product[] | undefined;
  warehouseId: string | undefined;
  refetch: () => void;
  closeModal: () => void;
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

  const { mutate: addProduct } = useAddProductMutation({
    onSuccess: () => {
      setIsCreatingAProduct(false);
      setProduct('');
      setQuantity('');
      closeModal();
    },
    onError: () => {
      alert('Something went wrong');
    },
  });

  const { mutate: updateBatch } = useEditBatchMutation({
    onSuccess: () => {
      refetch();
      setProduct('');
      setQuantity('');
      closeModal();
    },
    onError: () => {
      alert('Something went wrong');
    },
  });

  const { mutate: addBatch } = useAddBatchMutation({
    onSuccess: () => {
      refetch();
      setProduct('');
      setQuantity('');
      closeModal();
    },
    onError: () => {
      alert('Something went wrong');
    },
  });

  const handleSubmit = () => {
    if (isCreatingAProduct) {
      addProduct({
        name,
        sku,
        description,
        barcode,
        weight,
        dimensions,
        category,
        manufacturer,
        originCountry,
      });
      return;
    }

    if (isEditing && warehouseId) {
      updateBatch({
        batchId: isEditing,
        quantity: Number(quantity),
      });
      return;
    }

    if (!warehouseId) return;
    addBatch({
      itemId: product,
      warehouseId,
      quantity: Number(quantity),
    });
  };

  const handleProductChange = (e: SelectChangeEvent<string>) => {
    setProduct(e.target.value);
  };

  return (
    <Modal open={open} onClose={closeModal}>
      <div
        className={styles['addWarehouseModalContainer']}
        onClick={() => {
          closeModal();
          setIsCreatingAProduct(false);
        }}
      >
        <div
          className={styles['addWarehouseModal']}
          onClick={e => e.stopPropagation()}
        >
          {!isCreatingAProduct && (
            <>
              <h1>
                {isEditing
                  ? 'Update Product Quantity'
                  : 'Add Product to Warehouse'}
              </h1>
              {!isEditing && (
                <>
                  <InputLabel id="name-label">Product</InputLabel>
                  <div className={styles['select-container']}>
                    <Select<string>
                      className={styles['select']}
                      labelId="name-label"
                      name="Product"
                      value={product}
                      onChange={handleProductChange}
                      label="Product"
                    >
                      {notAddedProducts?.map(product => (
                        // TODO: add actions here:
                        <MenuItem value={product.id} key={product.id}>
                          {product.name ? product.name : 'not named'}
                        </MenuItem>
                      ))}
                    </Select>
                    <Button
                      onClick={() => setIsCreatingAProduct(true)}
                      className={styles['add-button']}
                      variant="contained"
                    >
                      +
                    </Button>
                  </div>
                </>
              )}
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

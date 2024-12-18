import { useEffect, useState, useCallback, useMemo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useBatchesQuery } from '../../queries/useBatches';
import { useParams } from 'react-router';
import { useAxios } from '../../hooks/useAxios';
import { Product } from '../../types/product';
import styles from './warehouse.module.css';
import { Button } from '@mui/material';
import { AddProductToWarehouseModal } from './components/Modal';
import { useProductsQuery } from '../../queries/useProducts';
import { useDeleteBatchMutation } from '../../mutations/batches';

interface Column {
  id: 'name' | 'quantity' | 'barcode' | 'description' | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Item Name', minWidth: 170 },
  {
    id: 'quantity',
    label: 'Quantity',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'barcode',
    label: 'Barcode',
    minWidth: 50,
    align: 'right',
  },
  {
    id: 'description',
    label: 'Description',
    minWidth: 170,
    align: 'right',
    format: (value: string) =>
      value.length > 30 ? value.substring(0, 50) + '...' : value,
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 170,
    align: 'right',
  },
];

export const Warehouse = () => {
  const axios = useAxios();
  const { warehouseId } = useParams<{ warehouseId: string }>();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [products, setProducts] = useState<(Product & { quantity: number })[]>(
    []
  );
  const [open, setOpen] = useState(false);

  const { data: batches, refetch: refetchBatches } = useBatchesQuery({
    warehouseId,
  });
  const { data: allProducts } = useProductsQuery({ enabled: open });

  const { mutate: deleteBatch } = useDeleteBatchMutation({
    onSuccess: async () => {
      await refetchBatches();
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        alert(`Something went wrong: ${error.message}`);
      } else {
        alert('Something went wrong');
      }
    },
  });

  const notAddedProducts = useMemo(() => {
    if (!allProducts) return [];
    return allProducts.filter(
      product => !products.some(p => p.id === product.id)
    );
  }, [allProducts, products]);

  const fetchProducts = useCallback(async () => {
    if (!batches || !axios) return;

    try {
      const productBatches = batches.map(batch => ({
        id: batch.itemId,
        quantity: batch.quantity,
      }));

      const fetchedProducts = await Promise.all(
        productBatches.map(async ({ id, quantity }) => {
          const { data } = await axios.get<Product>(`item/${id}`);
          return { ...data, quantity };
        })
      );

      setProducts(fetchedProducts);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Failed to fetch products: ${error.message}`);
      } else {
        console.error('Failed to fetch products');
      }
    }
  }, [axios, batches]);

  useEffect(() => {
    void fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batches]);

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <div className={styles['header']}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Product
        </Button>
      </div>
      {products.length > 0 ? (
        <>
          <TableContainer style={{ maxHeight: '85vh' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {products
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(product => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={product.id}
                    >
                      {columns.map(column => {
                        if (column.id === 'actions') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Button
                                variant="contained"
                                onClick={() => {
                                  const batch = batches?.find(
                                    batch => batch.itemId === product.id
                                  );
                                  if (!batch) return;
                                  deleteBatch({ batchId: batch.id });
                                }}
                              >
                                Delete
                              </Button>
                              <Button
                                variant="contained"
                                onClick={() => {
                                  // TODO: edit product
                                }}
                              >
                                Edit
                              </Button>
                            </TableCell>
                          );
                        }
                        const value = product[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'string'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <div>No products found</div>
      )}
      <AddProductToWarehouseModal
        open={open}
        isEditing={false}
        notAddedProducts={notAddedProducts}
        warehouseId={warehouseId}
        refetch={async () => {
          await refetchBatches();
          await fetchProducts();
        }}
        setOpen={setOpen}
      />
    </div>
  );
};

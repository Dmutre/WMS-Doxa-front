import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
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

interface Column {
  id: 'name' | 'quantity' | 'barcode' | 'description';
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
    format: (value: string) => {
      if (value.length > 30) {
        return value.substring(0, 50) + '...';
      }
      return value;
    },
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

  const { data: batches } = useBatchesQuery({
    warehouseId,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      if (!batches) return;

      const productBatches = batches.map(batch => {
        return {
          id: batch.itemId,
          quantity: batch.quantity,
        };
      });
      try {
        const products = await Promise.all(
          productBatches.map(async productBatch => {
            const { data } = await axios.get(`product/${productBatch.id}`);
            return {
              ...data,
              quantity: productBatch.quantity,
            };
          })
        );
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [axios, batches]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper>
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
              .map(product => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={product.id}
                  >
                    {columns.map(column => {
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
                );
              })}
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
    </Paper>
  );
};

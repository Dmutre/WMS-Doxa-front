import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TablePagination,
  TableCell,
  Skeleton,
} from '@mui/material';
import { EmployeesTableRow } from './components/EmployeesTableRow';
import styles from './EmployeesTable.module.css';
import { useEmployeesQuery } from '../../../../../queries/useEmployees';
import { useState } from 'react';

export const EmployeesTable = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { data, isSuccess, isLoading } = useEmployeesQuery({
    page: page + 1,
    pageSize: pageSize,
  });

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newPageSize = parseInt(event.target.value);
    setPageSize(newPageSize);
    setPage(0);
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <Skeleton variant="rounded" animation="wave" height={50} />
        <Skeleton variant="rounded" animation="wave" height={50} />
        <Skeleton variant="rounded" animation="wave" height={50} />
        <Skeleton variant="rounded" animation="wave" height={50} />
        <Skeleton variant="rounded" animation="wave" height={50} />
        <Skeleton variant="rounded" animation="wave" height={50} />
        <Skeleton variant="rounded" animation="wave" height={50} />
      </div>
    );
  }

  return (
    <Paper className={styles['paper']}>
      <TableContainer
        className={styles['table-container']}
        style={{ overflow: 'auto' }}
      >
        <Table stickyHeader sx={{ borderRadius: '1rem' }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#F5F5F5' }}>
              <TableCell className={styles['head-cell']}>Full name</TableCell>
              <TableCell className={styles['head-cell']}>Email</TableCell>
              <TableCell className={styles['head-cell']}>Status</TableCell>
              <TableCell className={styles['head-cell']}>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isSuccess &&
              data.data.map(item => {
                return (
                  <EmployeesTableRow
                    key={item.id}
                    firstName={item.firstName}
                    lastName={item.lastName}
                    email={item.email}
                    role={item.role.name}
                    status={item.status}
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={isSuccess ? data?.total : 1}
        rowsPerPage={pageSize}
        page={page}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        onPageChange={(_, page) => handleChangePage(page)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

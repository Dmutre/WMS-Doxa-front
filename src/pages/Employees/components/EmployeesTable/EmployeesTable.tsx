import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Checkbox,
  TableBody,
  TablePagination,
  TableCell,
} from '@mui/material';
import { EmployeesDto } from '../../../../types/employee';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import { EmployeesTableRow } from './components/EmployeesTableRow';
import styles from './EmployeesTable.module.css';

export const EmployeesTable = () => {
  const { data, total } = useLoaderData() as EmployeesDto;
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') || '0', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setSearchParams({
      page: newPage.toString(),
      pageSize: pageSize.toString(),
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowsPerPage = event.target.value.toString();
    setSearchParams({ page: page.toString(), pageSize: newRowsPerPage });
  };

  return (
    <Paper className={styles['paper']}>
      <TableContainer className={styles['table-container']}>
        <Table stickyHeader sx={{ borderRadius: '1rem' }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#F5F5F5' }}>
              <TableCell className={styles['head-cell']}>First name</TableCell>
              <TableCell className={styles['head-cell']} padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell className={styles['head-cell']}></TableCell>
              <TableCell className={styles['head-cell']}>Last name</TableCell>
              <TableCell className={styles['head-cell']}>
                Phone number
              </TableCell>
              <TableCell className={styles['head-cell']}>Status</TableCell>
              <TableCell className={styles['head-cell']}>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(item => {
              return (
                <EmployeesTableRow
                  key={item.id}
                  firstName={item.firstName}
                  lastName={item.lastName}
                  email={item.email}
                  phone={item.phone}
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
        count={total}
        rowsPerPage={pageSize}
        page={page}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

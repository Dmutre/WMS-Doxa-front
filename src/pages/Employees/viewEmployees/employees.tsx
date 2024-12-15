import { Button } from '@mui/material';
import { EmployeesTable } from './components/EmployeesTable';
import styles from './employees.module.css';

export const Employees = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Employees</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingBottom: '1em',
        }}
      >
        <Button variant="contained">Create an employee</Button>
      </div>
      <EmployeesTable />
    </div>
  );
};

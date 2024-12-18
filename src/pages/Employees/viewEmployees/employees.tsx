import { Button } from '@mui/material';
import { EmployeesTable } from './components/EmployeesTable';
import styles from './employees.module.css';
import { useNavigate } from 'react-router';

export const Employees = () => {
  const navigate = useNavigate();
  const handleCreateEmployee = () => {
    navigate('/employees/create');
  };

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
        <Button variant="contained" onClick={handleCreateEmployee}>
          Create an employee
        </Button>
      </div>
      <EmployeesTable />
    </div>
  );
};

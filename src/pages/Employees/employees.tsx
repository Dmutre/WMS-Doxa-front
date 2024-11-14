import { EmployeesTable } from './components/EmployeesTable';
import styles from './employees.module.css';

export const Employees = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Employees</p>
      <EmployeesTable />
    </div>
  );
};

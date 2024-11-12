import { EmployeesTable } from './components/EmployeesTable';

export const Employees = () => {
  return (
    <div>
      <div
        style={{
          width: '80%',
          margin: 'auto',
        }}
      >
        <p
          style={{
            margin: '0.5rem 0rem',
            fontSize: '2rem',
          }}
        >
          Employees
        </p>
        <EmployeesTable />
      </div>
    </div>
  );
};

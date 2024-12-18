import { TableCell, TableRow } from '@mui/material';
import { FC } from 'react';

interface IEmployeesTableRowProps {
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  role: string;
}

export const EmployeesTableRow: FC<IEmployeesTableRowProps> = ({
  firstName,
  lastName,
  email,
  status,
  role,
}) => {
  return (
    <TableRow>
      <TableCell>
        {firstName} {lastName}
      </TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>{role}</TableCell>
    </TableRow>
  );
};

import { Checkbox, TableCell, TableRow } from '@mui/material';
import { FC, useState } from 'react';

interface IEmployeesTableRowProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  role: string;
}

export const EmployeesTableRow: FC<IEmployeesTableRowProps> = ({
  firstName,
  lastName,
  email,
  phone,
  status,
  role,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <TableRow selected={isSelected}>
      <TableCell padding="checkbox">
        <Checkbox onChange={() => setIsSelected(!isSelected)} />
      </TableCell>
      <TableCell>
        {firstName} {lastName}
      </TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{phone}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>{role}</TableCell>
    </TableRow>
  );
};

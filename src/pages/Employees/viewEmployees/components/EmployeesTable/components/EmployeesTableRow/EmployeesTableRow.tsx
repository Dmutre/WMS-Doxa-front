import { TableCell, TableRow } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router';

interface IEmployeesTableRowProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  role: string;
}

export const EmployeesTableRow: FC<IEmployeesTableRowProps> = ({
  id,
  firstName,
  lastName,
  email,
  status,
  role,
}) => {
  const navigate = useNavigate();
  return (
    <TableRow hover onClick={() => navigate(id)} sx={{ cursor: 'pointer' }}>
      <TableCell>
        {firstName} {lastName}
      </TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>{role}</TableCell>
    </TableRow>
  );
};

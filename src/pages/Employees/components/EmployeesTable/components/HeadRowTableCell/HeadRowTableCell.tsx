import { TableCell, TableCellProps } from '@mui/material';
import { FC } from 'react';

export const HeadRowTableCell: FC<TableCellProps> = ({
  children,
  ...props
}) => {
  return (
    <TableCell sx={{ backgroundColor: 'inherit' }} {...props}>
      {children}
    </TableCell>
  );
};

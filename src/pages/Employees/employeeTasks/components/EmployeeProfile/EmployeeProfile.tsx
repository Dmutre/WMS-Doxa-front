import { FC } from 'react';
import { useEmployeeByIdQuery } from '../../../../../queries/useEmployees';
import { Card, CardContent, Skeleton, Typography } from '@mui/material';
import { useSkeleton } from '../../../../../hooks/useSkeleton';

interface IEmployeeProfileProps {
  id: string;
}

export const EmployeeProfile: FC<IEmployeeProfileProps> = ({ id }) => {
  const { data: employee, isLoading } = useEmployeeByIdQuery(id);
  const isSkeletonShown = useSkeleton(isLoading);
  const { firstName, lastName, email, role, createdAt } = employee || {};
  const formattedDate = createdAt && new Date(createdAt).toLocaleDateString();

  return (
    <Card sx={{ maxWidth: 400, margin: '1rem', boxShadow: 3 }}>
      {isSkeletonShown ? (
        <Skeleton variant="rounded" animation="wave" width={300} height={200} />
      ) : (
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {firstName ?? 'N/A'} {lastName ?? 'N/A'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>Email:</strong> {email ?? 'N/A'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>Status:</strong> {employee?.status ?? 'N/A'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>Role:</strong> {role?.name ?? 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Created At:</strong> {formattedDate ?? 'N/A'}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
};

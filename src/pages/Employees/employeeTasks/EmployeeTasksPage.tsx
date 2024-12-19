import { useParams, useNavigate } from 'react-router';
import { EmployeeProfile } from './components/EmployeeProfile';
import { Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { AssignedTasks } from './components/AssignedTasks';

export const EmployeeTasksPage = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  if (!employeeId) {
    return <div>Employee not found</div>;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem',
      }}
    >
      <Button
        variant="text"
        onClick={() => navigate(-1)}
        sx={{ alignSelf: 'flex-start' }}
      >
        <ArrowBack />
        Previous Page
      </Button>

      <div style={{ display: 'flex', gap: '2rem', width: '100%' }}>
        <div>
          <EmployeeProfile id={employeeId} />
        </div>

        <AssignedTasks
          onAssignNewTask={() => navigate('create-task')}
          employeeId={employeeId}
        />
      </div>
    </div>
  );
};

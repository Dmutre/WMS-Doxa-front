import React, { useState } from 'react';
import {
  Button,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TableContainer,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTasksQuery } from '../../../../../queries/useTasks';
import { useDeleteTaskMutation } from '../../../../../mutations/tasks';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { convertMillisecondsToHours } from '../../../../../utils/utils';

interface AssignedTasksProps {
  employeeId: string;
  onAssignNewTask: () => void;
}

export const AssignedTasks: React.FC<AssignedTasksProps> = ({
  employeeId,
  onAssignNewTask,
}) => {
  const client = useQueryClient();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data, isSuccess, isLoading, isError } = useTasksQuery({
    page: page + 1,
    pageSize: rowsPerPage,
    assigneeId: employeeId,
  });
  const { mutate: onDelete } = useDeleteTaskMutation({
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task deleted successfully');
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      const errorMessage =
        error.response?.data?.message || 'Failed to delete task';
      toast.error(errorMessage);
    },
  });

  const tasks = data?.data ?? [];

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) {
    return (
      <Paper
        elevation={3}
        style={{
          borderRadius: '1rem',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          flex: 1,
        }}
      >
        <Typography variant="h6" style={{ textAlign: 'center' }}>
          Loading tasks...
        </Typography>
      </Paper>
    );
  }

  if (isError) {
    return (
      <Paper
        elevation={3}
        style={{
          borderRadius: '1rem',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          flex: 1,
        }}
      >
        <Typography variant="h6" style={{ textAlign: 'center' }}>
          Error loading tasks.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={3}
      style={{
        borderRadius: '1rem',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        flex: 1,
      }}
    >
      <Typography variant="h6" style={{ textAlign: 'center' }}>
        Assigned Tasks
      </Typography>
      <TableContainer style={{ overflow: 'auto', maxHeight: '400px' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Task Title</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Estimate (Hrs)</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.length > 0 ? (
              tasks.map(task => (
                <TableRow key={task.id} hover sx={{ cursor: 'pointer' }}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat('en-GB', {
                      dateStyle: 'long',
                      timeStyle: 'short',
                      timeZone: 'UTC',
                    }).format(new Date(task.startDate))}
                  </TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat('en-GB', {
                      dateStyle: 'long',
                      timeStyle: 'short',
                      timeZone: 'UTC',
                    }).format(new Date(task.dueDate))}
                  </TableCell>
                  <TableCell>
                    {convertMillisecondsToHours(task.estimate)}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => onDelete(task.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                  No tasks available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={isSuccess ? data?.total : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        rowsPerPageOptions={[5, 10, 20]}
        onPageChange={(_, page) => handleChangePage(page)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={onAssignNewTask}
      >
        Assign New Task
      </Button>
    </Paper>
  );
};

import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Stack,
  Box,
  Typography,
} from '@mui/material';
import { useCreateTaskMutation } from '../../../mutations/tasks';
import { useMe } from '../../../queries/useMe';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

type TaskFormData = {
  title: string;
  description: string;
  priority: number;
  startDate: string;
  dueDate: string;
  estimate: number;
};

export const CreateTaskPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TaskFormData>({
    defaultValues: {
      title: '',
      description: '',
      priority: 10,
      startDate: '',
      dueDate: '',
      estimate: 0,
    },
  });
  const navigate = useNavigate();

  const { employeeId } = useParams();
  const { mutate: createTask } = useCreateTaskMutation({
    onSuccess: () => {
      navigate(-1);
      toast.success('Task created successfully');
    },
    onError: () => {
      toast.error('Failed to create task');
    },
  });
  const { data: me } = useMe();

  const onSubmit = (data: TaskFormData) => {
    if (me) {
      try {
        const request = {
          ...data,
          assigneeId: employeeId as string,
          reporterId: me.id,
          estimate: data.estimate * 60 * 60 * 1000,
        };
        createTask(request);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Create Task
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Title is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title*"
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            rules={{ required: 'Description is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description*"
                fullWidth
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />

          <Controller
            name="priority"
            control={control}
            rules={{ required: 'Priority is required' }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.priority}>
                <InputLabel>Priority</InputLabel>
                <Select {...field} label="Priority">
                  {[10, 20, 30, 40, 50].map(priority => (
                    <MenuItem key={priority} value={priority}>
                      {priority}
                    </MenuItem>
                  ))}
                </Select>
                {errors.priority && (
                  <Typography color="error" variant="caption">
                    {errors.priority.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Controller
              name="startDate"
              control={control}
              rules={{ required: 'Start date is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Start Date*"
                  type="datetime-local"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.startDate}
                  helperText={errors.startDate?.message}
                />
              )}
            />

            <Controller
              name="dueDate"
              control={control}
              rules={{ required: 'Due date is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Due Date*"
                  type="datetime-local"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.dueDate}
                  helperText={errors.dueDate?.message}
                />
              )}
            />
          </Stack>

          <Controller
            name="estimate"
            control={control}
            rules={{
              required: 'Estimate is required',
              min: {
                value: 0,
                message: 'Estimate must be greater than or equal to 0',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Estimated Time (hours)*"
                type="number"
                fullWidth
                error={!!errors.estimate}
                helperText={errors.estimate?.message}
                inputProps={{ min: 0 }}
              />
            )}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create Task
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

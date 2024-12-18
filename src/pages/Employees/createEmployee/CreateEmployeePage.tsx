import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  useCreateEmployeeMutation,
  ICreateEmployeeProps,
} from '../../../mutations/employees';
import { toast } from 'react-toastify';
import { useRolesQuery } from '../../../queries/useRoles';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

export const CreateEmployeePage = () => {
  const navigate = useNavigate();
  const client = useQueryClient();
  const { mutate: createEmployee } = useCreateEmployeeMutation({
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ['employees'] });
    },
  });
  const { data } = useRolesQuery({
    page: 1,
    pageSize: 10,
  });
  const roles = data?.data ?? [];

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICreateEmployeeProps>();

  const onSubmit = async (data: ICreateEmployeeProps) => {
    console.log('submitting', data);
    try {
      await createEmployee(data);
      toast.success('Employee created successfully');
      navigate('/employees');
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || 'Failed to create employee';
      toast.error(errorMessage);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f4f8',
      }}
    >
      <Paper
        elevation={3}
        style={{
          padding: '2rem',
          borderRadius: '10px',
          backgroundColor: '#fff',
          position: 'relative',
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          style={{ marginBottom: '1rem', textAlign: 'center' }}
        >
          Create an Employee
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '300px',
          }}
          autoComplete="off"
        >
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            rules={{
              required: 'First Name is required',
              maxLength: {
                value: 128,
                message: 'First Name cannot exceed 128 characters',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="First Name"
                variant="outlined"
                autoComplete="off"
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            rules={{
              required: 'Last Name is required',
              maxLength: {
                value: 128,
                message: 'Last Name cannot exceed 128 characters',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Last Name"
                variant="outlined"
                autoComplete="off"
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Enter a valid email address',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                type="email"
                autoComplete="off"
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Password"
                variant="outlined"
                type="password"
                autoComplete="off"
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
          <FormControl variant="outlined" error={!!errors.roleId}>
            <InputLabel id="role-label">Role</InputLabel>
            <Controller
              name="roleId"
              control={control}
              defaultValue=""
              rules={{
                required: 'Role is required',
              }}
              render={({ field }) => (
                <Select {...field} labelId="role-label" label="Role">
                  {roles.map(role => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.roleId && (
              <p style={{ color: 'red', marginTop: '0.5rem' }}>
                {errors.roleId.message}
              </p>
            )}
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Create Employee
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="primary"
            component={Link}
            to="/employees"
          >
            Cancel
          </Button>
        </form>
      </Paper>
    </div>
  );
};

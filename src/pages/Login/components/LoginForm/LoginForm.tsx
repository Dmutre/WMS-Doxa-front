import { Button, TextField } from '@mui/material';
import { Form } from 'react-router-dom';
import styles from './LoginForm.module.css';

export const LoginForm = () => {
  return (
    <Form method="post" className={styles['form-container']}>
      <span className={styles['form-title']}>Welcome Back</span>
      <TextField name="email" label="Email" variant="outlined" />
      <TextField
        name="password"
        type="password"
        label="Password"
        variant="outlined"
      />
      <Button variant="contained" type="submit" color="primary">
        Login
      </Button>
      <Button variant="outlined" color="secondary">
        Register
      </Button>
    </Form>
  );
};

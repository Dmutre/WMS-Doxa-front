import { Button, TextField } from '@mui/material';
import styles from './LoginForm.module.css';
import { useState } from 'react';
import { useAxios } from '../../../../hooks/useAxios';
import { useAuth } from '../../../../stores/auth';
import { useNavigate } from 'react-router';

export const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('sudo@doxa.com');
  const [password, setPassword] = useState('787898_Su');
  const axios = useAxios();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await axios<{ token: string }>('auth/login', {
      method: 'POST',
      data: {
        email: email,
        password: password,
      },
    });
    login(response.data.token);
    localStorage.setItem('accessToken', response.data.token);
    navigate('/warehouses', { replace: true });
  };

  return (
    <form
      className={styles['form-container']}
      onSubmit={e => e.preventDefault()}
    >
      <span className={styles['form-title']}>Welcome Back</span>
      <TextField
        name="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        name="password"
        type="password"
        label="Password"
        variant="outlined"
        onChange={e => setPassword(e.target.value)}
        value={password}
      />
      <Button
        variant="contained"
        type="submit"
        color="primary"
        onClick={handleSubmit}
      >
        Login
      </Button>
      <Button variant="outlined" color="secondary">
        Register
      </Button>
    </form>
  );
};

import { Button, Input } from '@mui/material';
import { useState } from 'react';
import { useAxios } from '../hooks/useAxios';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const axios = useAxios();

  const handleSubmit = async () => {
    const response = await axios.post('/login', {
      username,
      password,
    });
    console.log('response', response);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '10%',
          backgroundColor: '#fff',
          width: '100%',
        }}
      >
        Warehouse Manager
      </header>
      <main
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90%',
          width: '100%',
        }}
      >
        <img
          src="https://media.istockphoto.com/id/1405246054/photo/empty-warehouse-in-logistic-center.jpg?s=612x612&w=0&k=20&c=G2GPj8tAeTs71u3hHD9qze_8F41KsoTpopbW94CcRYs="
          alt="logo"
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '300px',
            padding: '20px',
            borderRadius: '10px',
            border: '1px solid #ccc',
            backgroundColor: '#fff',
            zIndex: 1,
          }}
        >
          <span>Please, login</span>
          <Input
            onChange={e => setUsername(e.target.value)}
            placeholder="username"
          />
          <Input
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <Button onClick={handleSubmit} type="submit">
            Login
          </Button>
        </div>
      </main>
    </div>
  );
};

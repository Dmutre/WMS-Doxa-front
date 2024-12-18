import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar/Sidebar';
import { useAuth } from './stores/auth';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import styles from './App.module.css';

export const App = () => {
  const { isAuth, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      login(token);
    } else {
      navigate('/login', { replace: true });
    }
  }, [isAuth, login, navigate]);

  return (
    <div className={styles['app-container']}>
      <ToastContainer />
      {isAuth ? (
        <>
          <Sidebar />
          <main className={styles['outlined-container']}>
            <Outlet />
          </main>
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

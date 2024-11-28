import { Outlet } from 'react-router-dom';
import styles from './App.module.css';
import { Sidebar } from './components/Sidebar/Sidebar';
import { useAuth } from './stores/auth';

export const App = () => {
  const { isAuth } = useAuth();
  return (
    <div className={styles['app-container']}>
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

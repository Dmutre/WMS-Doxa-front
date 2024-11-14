import { Outlet } from 'react-router-dom';
import styles from './App.module.css';
import { Sidebar } from './components/Sidebar/Sidebar';

export const App = () => {
  return (
    <div className={styles['app-container']}>
      <Sidebar />
      <main className={styles['outlined-container']}>
        <Outlet />
      </main>
    </div>
  );
};

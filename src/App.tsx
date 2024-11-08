import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import styles from './App.module.css';

export const App = () => {
  return (
    <div className={styles['app-container']}>
      <Header customStyles={styles['header']} />
      <main className={styles['outlined-container']}>
        <Outlet />
      </main>
    </div>
  );
};

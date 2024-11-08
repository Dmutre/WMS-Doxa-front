import { LoginForm } from './components/LoginForm';
import styles from './Login.module.css';

export const Login = () => {
  return (
    <div className={styles['page-container']}>
      <img
        src="https://media.istockphoto.com/id/1405246054/photo/empty-warehouse-in-logistic-center.jpg?s=612x612&w=0&k=20&c=G2GPj8tAeTs71u3hHD9qze_8F41KsoTpopbW94CcRYs="
        alt="logo"
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      />
      <LoginForm />
    </div>
  );
};

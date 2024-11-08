import { FC } from 'react';
import styles from './Header.module.css';

interface IHeaderProps {
  customStyles?: string;
}

export const Header: FC<IHeaderProps> = ({ customStyles }) => {
  return (
    <header className={`${styles['login-header']} ${customStyles || ''}`}>
      Warehouse Manager
    </header>
  );
};

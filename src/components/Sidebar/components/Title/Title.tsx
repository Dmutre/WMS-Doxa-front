import { FC } from 'react';
import styles from './Title.module.css';

interface ITitleProps {
  title: string;
}

export const Title: FC<ITitleProps> = ({ title }) => {
  return <div className={styles.title}>{title}</div>;
};

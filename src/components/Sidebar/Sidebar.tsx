import { Title } from './components/Title';
import { NavLink } from 'react-router-dom';
import { NavLinkRenderProps } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import styles from './Sidebar.module.css';

export const Sidebar = () => {
  const navLinkClassName = ({
    isActive,
    isPending,
    isTransitioning,
  }: NavLinkRenderProps) => {
    return [
      styles.navlink,
      isPending ? 'pending' : '',
      isActive ? styles.active : '',
      isTransitioning ? 'transitioning' : '',
    ].join(' ');
  };

  return (
    <div className={styles.container}>
      <Title title="WMS Doxa" />
      <NavLink to={'warehouses'} className={navLinkClassName}>
        <WarehouseIcon style={{ padding: '0px' }} />
        Warehouses
      </NavLink>
      <NavLink to={'/employees'} className={navLinkClassName}>
        <PeopleIcon style={{ padding: '0px' }} />
        Employees
      </NavLink>
    </div>
  );
};

import axios from 'axios';
import { useAuth } from '../stores/auth';

export const useAxios = () => {
  const accessToken = useAuth(state => state.accessToken);

  const instance = axios.create({
    baseURL: 'http://91.219.61.93:4000/api',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return instance;
};

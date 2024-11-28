import { create } from 'zustand';

interface IAuthState {
  isAuth: boolean;
  accessToken: string;
  login: (token: string) => void;
}

export const useAuth = create<IAuthState>(set => ({
  isAuth: false,
  accessToken: '',
  login: (token: string) =>
    set(() => ({
      accessToken: token,
      isAuth: true,
    })),
}));

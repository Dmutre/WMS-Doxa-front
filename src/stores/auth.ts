import { create } from 'zustand';

interface IAuthState {
  accessToken: string;
  login: (token: string) => void;
}

export const useAuth = create<IAuthState>(set => ({
  accessToken: '',
  login: (token: string) => set(() => ({ accessToken: token })),
}));

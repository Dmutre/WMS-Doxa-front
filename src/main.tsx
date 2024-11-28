import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { router } from './app/Router.tsx';
import { RouterProvider } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StyledEngineProvider>
  </StrictMode>
);

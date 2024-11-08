import { createRoutesFromElements, Route } from 'react-router';
import { Login, action as loginAction } from '../pages/Login';
import { App } from '../App';
import { createBrowserRouter } from 'react-router-dom';

const routes = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<div>IDI NAHUI</div>}>
    <Route
      index
      element={<Login />}
      action={loginAction}
      errorElement={<div>IDI NAHUI</div>}
    />
    <Route path="home" element={<div>Fucking home</div>} />
  </Route>
);

export const router = createBrowserRouter(routes);

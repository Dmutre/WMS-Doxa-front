import { createRoutesFromElements, Route } from 'react-router';
import { Login, action as loginAction } from '../pages/Login';
import { App } from '../App';
import { createBrowserRouter } from 'react-router-dom';
import { Warehouses } from '../pages/Warehouses/warehouses';

const routes = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<div>IDI NAHUI</div>}>
    <Route path="login" element={<Login />} action={loginAction} />
    <Route>
      <Route index element={<Warehouses />}></Route>
      <Route path=":id" element={<div>Warehouse</div>} />
      <Route path=":id/products/:id" element={<div>Product</div>} />
      <Route path=":id/employees/:id" element={<div>Employee</div>} />
    </Route>
  </Route>
);

export const router = createBrowserRouter(routes);

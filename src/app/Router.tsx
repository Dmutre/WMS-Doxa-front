import { createRoutesFromElements, Route } from 'react-router';
import { Login, action as loginAction } from '../pages/Login';
import { App } from '../App';
import { createBrowserRouter } from 'react-router-dom';
import { Warehouses } from '../pages/Warehouses/warehouses';
import { Employees, employeesLoader } from '../pages/Employees';

const routes = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<div>IDI NAHUI</div>}>
    <Route path="login" element={<Login />} action={loginAction} />
    <Route path="employees" element={<Employees />} loader={employeesLoader} />
    <Route>
      <Route path="warehouses" element={<Warehouses />} />
      <Route path="warehouses/:warehouseId" element={<div>Warehouse</div>} />
      <Route
        path="warehouses/:warehouseId/products/:productId"
        element={<div>Product</div>}
      />
      <Route
        path="warehouses/:warehouseId/employees/:employeeId"
        element={<div>Employee</div>}
      />
    </Route>
  </Route>
);

export const router = createBrowserRouter(routes);

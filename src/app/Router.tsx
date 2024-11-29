import { createRoutesFromElements, Route } from 'react-router';
import { Login } from '../pages/Login';
import { App } from '../App';
import { createBrowserRouter } from 'react-router-dom';
import { Warehouses } from '../pages/Warehouses/warehouses';
import { Employees, employeesLoader } from '../pages/Employees';
import { Warehouse } from '../pages/Warehouse/warehouse';

const routes = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<div>ERROR</div>}>
    <Route path="login" element={<Login />} />
    <Route path="employees" element={<Employees />} loader={employeesLoader} />
    <Route>
      <Route path="warehouses" element={<Warehouses />} />
      <Route path="warehouses/:warehouseId" element={<Warehouse />} />
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

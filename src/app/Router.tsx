import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';
import { Warehouses } from '../pages/Warehouses/warehouses';
import {
  Employees,
  CreateEmployeePage,
  EmployeeTasksPage,
} from '../pages/Employees';
import { CreateTaskPage } from '../pages/Tasks';
import { Warehouse } from '../pages/Warehouse/warehouse';
import { App } from '../App';
import { Login } from '../pages/Login';
import { ErrorPage } from '../pages/ErrorPage/ErrorPage';

const routes = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<Navigate to="/employees" />} />
    <Route path="employees/create" element={<CreateEmployeePage />} />
    <Route path="employees/:employeeId" element={<EmployeeTasksPage />} />

    <Route path="employees/:employeeId/create-task" element={<CreateTaskPage />} />

    <Route path="login" element={<Login />} />
    <Route path="employees" element={<Employees />} />
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

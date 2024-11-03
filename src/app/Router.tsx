import { createRoutesFromElements, Route } from 'react-router';
import { Login } from '../pages/login';
import { App } from '../App';
import { createBrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

const routes = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<div>Error</div>}>
    <Route
      path="/"
      element={
        <>
          <div>Home</div>
          <Link to="/login">Login</Link>
        </>
      }
    />
    <Route index path="/login" element={<Login />} />
  </Route>
);

export const router = createBrowserRouter(routes);

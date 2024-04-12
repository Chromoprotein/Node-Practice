import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  Route,
  Navigate,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements
} from "react-router-dom";
import Register from './Register';
import Login from './Login';
import Users from './Users';
import Admin from './Admin';
import App from './App';
import Books from './Books';
import axios from 'axios';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">        
      <Route index element={<App />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route
        path="getUsers"
        element={
          <RequireAuth redirectTo="/login" requireAdmin={false}>
            <Users />
          </RequireAuth>
        }
      />
      <Route
        path="getBooks"
        element={
          <RequireAuth redirectTo="/login" requireAdmin={false}>
            <Books />
          </RequireAuth>
        }
      />
      <Route
        path="/admin"
        element={
          <RequireAuth redirectTo="/login" requireAdmin={true}>
            <Admin />
          </RequireAuth>
        }
      />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Route>
  )
);

function RequireAuth({ children, redirectTo, requireAdmin }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_STATUS_URI, { withCredentials: true });
        const isAuthenticated = response.data.isAuthenticated;
        const userRole = response.data.role;
        setIsAdmin(isAuthenticated && userRole === 'admin');
        setIsLoggedIn(isAuthenticated);
      } catch (error) {
        console.error('Error checking authentication status:', error);
        setIsAdmin(false);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if(requireAdmin) {
    return isAdmin ? children : <Navigate to={redirectTo} />;
  } else {
    return isLoggedIn ? children : <Navigate to={redirectTo} />;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

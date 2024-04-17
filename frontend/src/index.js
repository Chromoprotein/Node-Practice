import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
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
import AddBook from './AddBook';
import axios from 'axios';
import Details from './Details';
import Logout from './Logout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">        
      <Route index element={<App />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="logout" element={<Logout />} />
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
        path="getBooks/details/:id"
        element={
          <RequireAuth redirectTo="/login" requireAdmin={false}>
            <Details />
          </RequireAuth>
        }
      />
      <Route
        path="addBook"
        element={
          <RequireAuth redirectTo="/login" requireAdmin={false}>
            <AddBook />
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

// A version of authentication that has loading and navigation
// For protecting routes
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
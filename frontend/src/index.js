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
import { useAuth } from './useAuth';

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

  const { isAuthenticated, userRole, loading } = useAuth();

  if (loading) {
    console.log("loading in the route check")
    return <div>Loading...</div>;
  }

  if(requireAdmin) {
    return userRole === "admin" ? children : <Navigate to={redirectTo} />;
  } else {
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
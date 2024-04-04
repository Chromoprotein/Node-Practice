import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from './Register';
import Login from './Login';
import Users from './Users';
import Admin from './Admin';
import App from './App';

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/getUsers",
    element: <Users/>
  },
  {
    path: "/admin",
    element: <Admin/>
  },
  {
    path: "/",
    element: <App/>
  },
]);

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

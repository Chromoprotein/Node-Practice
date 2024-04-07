// This page is for testing client-side authentication

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_STATUS_URI, { withCredentials: true });
        setIsAuthenticated(response.data.isAuthenticated);
        setUserRole(response.data.role);
      } catch (error) {
        console.error('Error checking authentication status:', error);
        setIsAuthenticated(false);
        setUserRole(null);
      }
    };

    checkAuthStatus();
  }, []);

  return { isAuthenticated, userRole };
};


//export default function User() {

//    const { isAuthenticated, userRole } = useAuth();

//    return (
//        <div>
//            <p>User authentication test page</p>
//            <p>Is authenticated: {isAuthenticated.toString()} </p>
//            <p>Role: {userRole} </p>
//        </div>
//    );
//};

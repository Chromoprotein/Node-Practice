import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function App() {

  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Decode JWT token to extract user information
    const token = cookies.jwt;
    if (token) {
      console.log("Token exists")
      const decodedToken = parseJwt(token);
      setUserData(decodedToken);
    }
  }, [cookies.jwt]);

  // Function to parse JWT token
  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      console.log("Token is valid")
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.log("Invalid token")
    }
  };

  return (
    <div>
    <div>
      {userData ? (
        <div>
          <p>Username: {userData.username}</p>
          <p>User ID: {userData.id}</p>
          <p>Role: {userData.role}</p>
          {/* Additional user information can be displayed here */}
        </div>
      ) : (
        <p>User not logged in</p>
      )}
    </div>

    <nav>
      <ul>
        <li>
          <Link to={`register`}>Register</Link>
        </li>
        <li>
          <Link to={`login`}>Login</Link>
        </li>
        <li>
          <Link to={`getUsers`}>Users</Link>
        </li>
        <li>
          <Link to={`admin`}>Admin page</Link>
        </li>
      </ul>
    </nav>
    </div>
  );
}

export default App;

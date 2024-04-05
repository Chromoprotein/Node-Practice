import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './useAuth';

function App() {
  const { isAuthenticated, userRole } = useAuth();
  return (
    <div>

    <nav>
      <ul>
        {!isAuthenticated &&
          <>
            <li>
              <Link to={`register`}>Register</Link>
            </li>
            <li>
              <Link to={`login`}>Login</Link>
            </li>
          </>
        }
        <li>
          <Link to={`getUsers`}>Users</Link>
        </li>
        {userRole === "admin" &&
          <li>
            <Link to={`admin`}>Admin page</Link>
          </li>
        }
      </ul>
    </nav>
    </div>
  );
}

export default App;

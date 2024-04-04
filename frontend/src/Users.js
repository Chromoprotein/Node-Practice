import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_USERS_URI, { withCredentials: true })
    .then(res => {
      setUsers(res.data.user);
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <ul>
        {users.map(user => {
           return (
            <>
                <li>Name: {user.username}</li>
                <li>Role: {user.role}</li>
            </>
           ) 
        })}
    </ul>
  );
};

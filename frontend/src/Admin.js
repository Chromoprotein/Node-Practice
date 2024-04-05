import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Admin() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_USERS_URI,
        { withCredentials: true })
        .then(res => {
            console.log(res.data.user)
            setUsers(res.data.user);
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const editRole = async (e) => {
        e.preventDefault();
        try {
            const userId = e.target.value;
            const response = await axios.put(
                process.env.REACT_APP_UPDATE_URI,
                { id: userId, role: "admin" },
                { withCredentials: true }
            );
            console.log(response.data);
            // Fetch the updated user list
            const updatedUsers = await axios.get(process.env.REACT_APP_USERS_URI, { withCredentials: true });
            setUsers(updatedUsers.data.user);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteUser = async (e) => {
        e.preventDefault();
        try {
            const userId = e.target.value;
            const response = await axios.delete(
                process.env.REACT_APP_DELETE_URI,
                {
                    data: { id: userId },
                    withCredentials: true
                }
            );
            console.log(response.data);

            // Fetch the updated user list
            const updatedUsers = await axios.get(process.env.REACT_APP_USERS_URI, { withCredentials: true });
            setUsers(updatedUsers.data.user);
        } catch (error) {
            console.error(error);
        }
    };

    return (
    <ul>
        {users
        .filter(user => user.role !== "admin")
        .map(user => {
            return (
            <div>
                <li>Name: {user.username}</li>
                <li>Role: {user.role}</li>
                <button value={user.id} onClick={editRole}>Update to admin</button>
                <button value={user.id} onClick={deleteUser}>Delete user</button>
            </div>
            ) 
        })}
    </ul>
    );
};

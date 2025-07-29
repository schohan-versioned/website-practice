// src/components/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers, createUser } from '../utils/api';

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/users`)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched users:', data);
        setUsers(data);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  return (
    <div className="centered-section">
      <h2>Registered Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Salary</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.fn} {user.ln}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>${user.salary}</td>
                <td>
                  <Link to={`/edit/${user.id}`} className="table-link">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

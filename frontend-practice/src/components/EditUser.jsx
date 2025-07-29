import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUsers, createUser } from '../utils/api';

export default function EditUser() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [salary, setSalary] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/user/${id}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setSalary(data.salary);
      })
      .catch(err => console.error('Error fetching user:', err));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_API}/updateuser/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ salary }),
    });
    navigate('/');
  };

  return (
    <div className="centered-section">
      <h2>Update Salary</h2>
      <p><strong>Name:</strong> {user.fn} {user.ln}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Age:</strong> {user.age}</p>

      <form onSubmit={handleUpdate}>
        <input
          type="number"
          placeholder="New Salary"
          value={salary}
          onChange={e => setSalary(e.target.value)}
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, createUser } from '../utils/api';

export default function AddUser() {
  const [fn, setFn] = useState('');
  const [ln, setLn] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [salary, setSalary] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_API}/createuser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fn, ln, email, age, salary }),
    });
    navigate('/');
  };

  return (
    <div className="centered-section">
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={fn}
          onChange={e => setFn(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Last Name"
          value={ln}
          onChange={e => setLn(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={e => setAge(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={e => setSalary(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

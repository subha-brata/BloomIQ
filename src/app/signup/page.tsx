"use client"
import React, { useState } from 'react';
import {useRouter} from 'next/navigation';
import "./signupstyles.css";

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    history.push('/login');
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button type="submit">Signup</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;

"use client"
import React, { useState, useContext } from 'react';
import { AuthContext } from '../state/AuthContext';
import { useRouter } from 'next/navigation';
import "./LoginStyles.css"
import Link from 'next/link';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authContext) {
      authContext.login();
      router.push('/profile');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
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
          <button type="submit">Login</button>
        </div>
        <Link href="/signup">Sign UP</Link>
      </form>
    </div>
  );
};

export default Login;

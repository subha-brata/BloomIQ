"use client"
import React, { useState, useContext } from 'react';
import { useAuth } from '../state/AuthContext';
import "./LoginStyles.css"
import Link from 'next/link';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {login}= useAuth();


  const handleSubmit = (e: React.FormEvent) => {
    console.log(`login button clicked`);
    e.preventDefault();
    if(username && password)
    login(username);
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>e-mail:</label>
          <input
            type="email"
            value={username}
            placeholder='jondoe2024@gmail.com'
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button type="submit">Login</button>
        </div>
        <br></br>
        <h6 style={
          {
            textAlign:"center"
          }
        }>Don't have an account??<Link href="/signup"
        style={{
         fontWeight:"600",
         color:"blue"
        }}>Sign up</Link></h6>
      </form>
    </div>
  );
};

export default Login;

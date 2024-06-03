"use client"
import React, { useState } from 'react';
import { useAuth } from '../state/AuthContext';
import "./LoginStyles.css"
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';
import Page_Loader from '../components/loaders/Page_Loader';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setloading] = useState(false);
  const {login}= useAuth(); // from Auth COntext
  //user structure for finding the user
  const user={
    email:username,
    password:password
  }

  const handleSubmit = async (e: React.FormEvent) => {
    setloading(true);
    // posts the api to the user structure 
    try {
      e.preventDefault();
      
      const res= await axios.post('/api/login',user);
      if(res.data.status===200){
        toast.success(`Login Successful`);
        await login(res.data.user.name, res.data.user.email); // sends to the useAuth
        console.log(res.data.user);
      }
      if(res.data.status===201) toast.warning(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error('Some problem is there');
    }
    finally{
      setloading(false);
    }
  };
  if(loading) return <Page_Loader></Page_Loader>
  else return (
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
        }>Don't have an account??<Link href="/register"
        style={{
         fontWeight:"600",
         color:"blue"
        }}>Sign up</Link></h6>
      </form>
    </div>
  );
};

export default Login;

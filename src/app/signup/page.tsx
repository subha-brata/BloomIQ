"use client"
import React, { useState } from 'react';
import {useRouter} from 'next/navigation';
import "./signupstyles.css";

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin,setisAdmin]=useState(false);
  const history = useRouter();

  const user={
    name:username,
    email:email,
    password: password,
    isAdmin:isAdmin
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    history.push('/login');
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Jon Doe'
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder='jondoe2024@gmail.com'
          />
        </div>
        
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password'
          />
        </div>
        <div>
          <label>Register as admin</label>
          <input type='checkbox' name='admin' value='admin' className='check'></input>
          
        </div>
        <div className="button-container">
          <button type="submit">Signup</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;

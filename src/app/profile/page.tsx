"use client"
import React, { useContext } from 'react';
import { useAuth } from '../state/AuthContext';
import './profile.css'

const Profile: React.FC = () => {
  const {isAuthenticated, logout} = useAuth();

  return (
    <div className="form-container">
      {isAuthenticated ? (
        <>
          <h1>Welcome to your profile!</h1>
          <div className="button-container">
            <button onClick={logout}>Logout</button>
          </div>
        </>
      ) : (
        <h1>Please log in.</h1>
      )}
    </div>
  );
};

export default Profile;

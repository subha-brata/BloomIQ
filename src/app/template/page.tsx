"use client"
import React, { useState } from 'react';
import './BloomLevelForm.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const BloomLevelForm = () => {

  const [percentages, setPercentages] = useState({
    name:'',
    level1: '',
    level2: '',
    level3: '',
    level4: '',
    level5: '',
    level6: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setPercentages({ ...percentages, [name]: value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    //   // Submit the form or perform further actions
    try {
        const res=await axios.post("/api/template",percentages)
        toast.success('success');
        console.log(res);
    } catch (error) {
        toast.error('something is wrong')
    }     
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" value={percentages.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="level1">Level 1:</label>
          <input type="number" name="level1" id="level1" value={percentages.level1} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="level2">Level 2:</label>
          <input type="number" name="level2" id="level2" value={percentages.level2} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="level3">Level 3:</label>
          <input type="number" name="level3" id="level3" value={percentages.level3} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="level4">Level 4:</label>
          <input type="number" name="level4" id="level4" value={percentages.level4} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="level5">Level 5:</label>
          <input type="number" name="level5" id="level5" value={percentages.level5} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="level6">Level 6:</label>
          <input type="number" name="level6" id="level6" value={percentages.level6} onChange={handleChange} />
        </div>
        <div className='button-container'>
        <button type="submit">Submit</button>
        </div>
        
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default BloomLevelForm;

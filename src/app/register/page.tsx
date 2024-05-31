"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./signupstyles.css";
import { toast } from "react-toastify";
import axios from "axios";

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setisAdmin] = useState(false);
  const [loading, setloading] = useState(false);
  const router = useRouter();

  //user structure
  const user = {
    name: username,
    email: email,
    password: password,
    isAdmin: isAdmin,
  };

  //on clicking the signup button
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setloading(true);
      const res = await axios.post("/api/signup", user);
      if (res.data.status === 201) toast.warning(res.data.message);
      if (res.data.status === 200) {
        toast.success(`SignUp Successful`);
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(`Some Problem is there`);
    } finally {
      setloading(false);
    }
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
            placeholder="Jon Doe"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="jondoe2024@gmail.com"
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </div>
        <div>
          <label>Register as admin</label>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setisAdmin(e.target.checked)}
          ></input>
        </div>
        <div className="button-container">
          {loading ? <p>loading</p> : <button type="submit">Signup</button>}
        </div>
      </form>
    </div>
  );
};

export default Signup;

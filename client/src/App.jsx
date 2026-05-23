import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "./config/api";

const App = () => {
  const [data, setData] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    college: "",
    year: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // SIGNUP
  const handleSignup = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        {
          username: formData.username,
          email: formData.email,
          college: formData.college,
          year: formData.year,
          password: formData.password, 
        }
      );

      setData(response.data.message);
      console.log("✅ Signup Success:", response.data);
    } catch (error) {
      setData(error?.response?.data?.message || "Signup failed");
      console.log("❌ Signup Error:", error?.response?.data);
    }
  };

  // LOGIN
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      setData(response.data.message);
      console.log("✅ Login Success:", response.data);
    } catch (error) {
      setData(error?.response?.data?.message || "Login failed");
      console.log("❌ Login Error:", error?.response?.data);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Auth API Test</h2>
      <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="text"
        name="college"
        placeholder="College"
        value={formData.college}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="text"
        name="year"
        placeholder="Year"
        value={formData.year}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
    </div>

      <button onClick={handleSignup}>Signup</button>
      <button onClick={handleLogin} style={{ marginLeft: "10px" }}>
        Login
      </button>

      <p>Response: {data}</p>
    </div>
  );
};

export default App;

import React, { useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", {
        name,
        email,
        password
      })
      alert("Succeesful registration!")
    } catch (error) {
      alert("Registration failed!")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="mt-4 mb-64">
        <h1 className="text-4xl text-center py-2">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerHandler}>
          <input
            type="text"
            placeholder="Jhon Wick"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="you@gmail.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button className="primary">Register</button>

          <div className="text-center text-gray-500 mt-2">
            Already have an account?
            <Link to="/login" className="text-blue-400">
              Login Now
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

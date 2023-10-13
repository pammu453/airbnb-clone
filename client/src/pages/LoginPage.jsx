import React, { useContext, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import axios from 'axios'

import { UserContext } from "../UserContext"

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {setUser}=useContext(UserContext);
  
  const submiteHandler=async(e)=>{
      e.preventDefault();
      try {
        const {data}=await axios.post('/user/login',{
          email,
          password
        })
        setUser(data)
        alert("Succesfull login")
        setRedirect(true)
      } catch (error) {
        alert("Invalid credentials")
      }
  }
 
  if(redirect){
    return <Navigate to="/"/>
  }

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="mt-4 mb-64">
        <h1 className="text-4xl text-center py-2">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={submiteHandler}>
          <input
            type="email"
            placeholder="you@gmail.com"
            value={email}
            onChange={e=>setEmail(e.target.value)}
          />
          <input 
          type="password" 
          placeholder="password" 
          value={password}
          onChange={e=>setPassword(e.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center text-gray-500 mt-2">Don't have an account?
            <Link to="/register" className="text-blue-400"> Register Now</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage

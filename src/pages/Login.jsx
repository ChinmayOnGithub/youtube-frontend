// import React from 'react'
import axios from 'axios'
import useAuth from '../contexts/AuthContext.js'
import { useState } from 'react';
// import { useEffect } from 'react';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  // save user to the context 
  const { user, login, logout, fetchCurrentUser } = useAuth();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://youtube-backend-clone.onrender.com/api/v1/users/login",
        { username, email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          }
        } // 🔥 Important!
      );

      const { accessToken, refreshToken } = res.data.data;
      login(accessToken); // Save access token
      // Optionally, you can store the refresh token as well
      localStorage.setItem('refreshToken', refreshToken);

      await fetchCurrentUser(); // ✅ Always fetch user after login

      alert("Login successful!");

    } catch (error) {
      if (error.response) {
        // 🌟 Axios error for status 400, 401, 404, etc.
        alert(error.response.data.message || "Login failed!");
      } else if (error.request) {
        // 🌟 Request sent but no response received (server down, network issue)
        alert("No response from server. Check your network.");
      } else {
        // 🌟 Axios internal error
        alert("Something went wrong. Try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center container mx-auto p-4 sm:p-6 bg-stone-950 w-full sm:w-6/7  h-full rounded-md">
      <div className="card w-96 shadow-xl p-6 bg-base-300">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <form onSubmit={handleLogin} className="flex flex-col justify-center items-center gap-4 mt-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input input-bordered input-primary"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered input-primary"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered input-primary"
          />
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>

        <div className="text-center text-gray-500 mt-4">
          current User: {user ?
            <div className='m-4'>
              <p className='text-xl font-bold p-2 text-white bg-black/20 rounded-t-xl'>{user.username}</p>
              <button onClick={logout} className='btn text-xl bg-amber-700 w-full rounded-t-none rounded-b-xl'>LOGOUT</button>
            </div>
            : "Not logged in"}
        </div>

      </div>

    </div>


  );
}

export default Login
"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link"; 
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter()

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1111/login", {
        email,
        pass,
      });
      Cookies.set("token", response.data.accessToken, {
        expires: 7, 
        secure: false, // true for https
        sameSite: "Strict",
      });
      sessionStorage.setItem("role", response.data.role);
      setMessage("Login successful!");
      router.push("/")
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 mt-10">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        {message && <div className="text-sky-500 font-bold mb-4 text-center">{message}</div>}
        <form onSubmit={loginUser}>
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mt-1"
            />
          </label>
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Password:
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mt-1"
            />
          </label>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link href="/Register">
            <span className="text-blue-500 hover:underline cursor-pointer">Register</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link"; // تأكد من إضافة هذه للاستفادة من التنقل بين الصفحات
import { useRouter } from "next/navigation";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1111/register", {
        name,
        email,
        pass,
        role,
      });
      setMessage("Registration successful!");
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center  pt-2">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h2>
        {message && <div className="text-sky-500 font-bold mb-4 text-center">{message}</div>}
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mt-1"
            />
          </label>
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
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Role:
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mt-1"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 mt-4 rounded-md hover:bg-green-600 transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link href="/Login">
            <span className="text-blue-500 hover:underline cursor-pointer">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

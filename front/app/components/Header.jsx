"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function Header() {
  const router = useRouter();
  const role = sessionStorage.getItem("role");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const TokenFromCookie = Cookies.get("token");
    setToken(TokenFromCookie);
  }, []);

  const Logout = async () => {
    const confirmed = confirm("Are you sure you want to log out?");
    if (!confirmed) return;
    try {
      await axios.post("http://localhost:1111/logout", {}, { withCredentials: true });
      Cookies.remove("token");
      setToken(null);
      router.push("/Login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-around p-4 bg-white shadow-lg rounded-lg border border-gray-200">
      <Link href="/" className="flex items-center text-2xl font-semibold text-gray-800 hover:text-blue-600 transition duration-300">
  <span>Welcome</span>,
  <span className="ml-1 font-semibold text-green-500">{role}</span>
</Link>

  
      <div className="flex space-x-4">
        {!token && (
          <>
            <Link
              href="/Login"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Login
            </Link>
            <Link
              href="/Register"
              className="px-5 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Register
            </Link>
          </>
        )}
        {token && (
          <span
            onClick={Logout}
            className="px-5 py-2 bg-red-600 cursor-pointer text-white rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Logout
          </span>
        )}
      </div>
    </div>
  );
}

export default Header;

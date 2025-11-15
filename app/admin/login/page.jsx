"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "Bombayseafood1985@gmail.com" && password === "Tajuddin") {
      localStorage.setItem("adminLoggedIn", "true");
      window.location.href = "/admin"; 
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>

        {error && (
          <p className="text-red-500 text-center mb-3">{error}</p>
        )}

        <input
          type="text"
          placeholder="Username"
          className="border p-2 w-full rounded-lg mb-4"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full rounded-lg mb-6"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
        >
          Login
        </button>
      </div>
    </div>
  );
}

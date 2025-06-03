"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the form from reloading the page

    if (!email) {
      setErrorMessage("Email is required");
      return;
    }

    setLoading(true);
    setErrorMessage(""); // Clear previous error message

    try {
      const response = await fetch("/api/generate-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Show success message or handle it however you want
      } else {
        setErrorMessage(data.message); // Show error message from API
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col align-center justify-center h-screen gap-4 max-w-md mx-auto">
      <input
        type="email"
        placeholder="email"
        className="bg-white text-black"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="password"
        className="bg-white text-black"
        placeholder="password"
      />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Sending OTP..." : "Login"}
      </button>
    </div>
  );
}

"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";

export const Signin = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [err, setErr] = useState(false);

  const route = useRouter();

  const [visible, setVisible] = useState(false);

  function handleChange(e: any) {
    const { name, value } = e.target;
    setInput((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleSubmit() {
    const res = await signIn("credentials", {
      email: input.email,
      password: input.password,
      redirect: false,
    });

    if (!res?.error) {
      route.push("/projects");
    } else {
      setErr(true);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center items-center p-6 font-sans">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-700 dark:to-teal-700 p-6">
          <h1 className="text-3xl font-bold text-white">Login</h1>
        </div>
        <div className="p-6">
          <input
            onChange={handleChange}
            className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 mt-2 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
            name="email"
            placeholder="Enter email"
            type="email"
            required
          />
          <div className="relative mt-4">
            <input
              onChange={handleChange}
              className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
              name="password"
              placeholder="Enter password"
              type={visible ? "text" : "password"}
              required
            />
            <button
              onClick={() => setVisible(!visible)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300"
              type="button"
            >
              {visible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {err && (
            <div className="text-red-600 text-sm mt-2">
              Incorrect credentials!
            </div>
          )}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white font-semibold py-3 rounded-full mt-6 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            Login
          </button>
          <div className="text-center mt-4">
            <span
              onClick={() => route.push("/signup")}
              className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-500 hover:underline cursor-pointer"
            >
              Create account?
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Signup = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPwd: "",
  });

  const route = useRouter();
  const [visible, setVisible] = useState(false);
  const [match, setMatch] = useState(true);

  function handleChange(e: any) {
    const { name, value } = e.target;
    setInput((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleSubmit() {
    if (input.password !== input.confirmPwd) {
      setMatch(false);
      return;
    }
    try {
      await axios.post("/api/user", input);
      alert("Signup successful. Redirecting to Login page");
      route.push("/signin");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center items-center p-6 font-sans">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-700 dark:to-teal-700 p-6">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
        </div>
        <div className="p-6">
          <input
            onChange={handleChange}
            className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 mt-2 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
            name="email"
            placeholder="Enter email"
            type="email"
            required
          />
          <div className="relative mt-4">
            <input
              onChange={handleChange}
              className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
              name="password"
              placeholder="Enter password"
              type={visible ? "text" : "password"}
              required
            />
            <button
              onClick={() => setVisible(!visible)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300"
              type="button"
            >
              {visible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="relative mt-4">
            <input
              onChange={handleChange}
              className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
              name="confirmPwd"
              placeholder="Confirm password"
              type={visible ? "text" : "password"}
              required
            />
            <button
              onClick={() => setVisible(!visible)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300"
              type="button"
            >
              {visible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {!match && (
            <div className="text-red-600 text-sm mt-2">
              Passwords do not match!
            </div>
          )}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white font-semibold py-3 rounded-full mt-6 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            Sign Up
          </button>
          <div className="text-center mt-4">
            <span
              onClick={() => route.push("/signin")}
              className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-500 hover:underline cursor-pointer"
            >
              Already have an account?
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

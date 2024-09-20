"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

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
      route.push("/home");
    } else {
      setErr(true);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-indigo-600 p-6">
          <h1 className="text-3xl font-bold text-white">Login</h1>
        </div>
        <div className="p-6">
          <input
            onChange={handleChange}
            className="w-full bg-indigo-50 text-indigo-900 mt-2 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="email"
            placeholder="Enter email"
            type="email"
            required
          />
          <div className="relative mt-4">
            <input
              onChange={handleChange}
              className="w-full bg-indigo-50 text-indigo-900 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              name="password"
              placeholder="Enter password"
              type={visible ? "text" : "password"}
              required
            />
            <Eye visible={visible} setVisible={setVisible} />
          </div>
          <div className={err ? "text-red-600 text-sm mt-2" : "hidden"}>
            Incorrect credentials!
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg mt-6 hover:bg-indigo-700 transition duration-300 shadow-md hover:shadow-lg"
          >
            Login
          </button>
          <div className="text-center mt-4">
            <span
              onClick={() => route.push("/signup")}
              className="text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
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

  function handleSubmit() {
    if (input.password !== input.confirmPwd) {
      setMatch(false);
      return;
    }
    axios.post("http://localhost:3000/api/user", input).then(() => {
      alert("signup successful. Redirecting to Login page");
      route.push("http://localhost:3000/signin");
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-indigo-600 p-6">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
        </div>
        <div className="p-6">
          <input
            onChange={handleChange}
            className="w-full bg-indigo-50 text-indigo-900 mt-2 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="email"
            placeholder="Enter email"
            type="email"
            required
          />
          <div className="relative mt-4">
            <input
              onChange={handleChange}
              className="w-full bg-indigo-50 text-indigo-900 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              name="password"
              placeholder="Enter password"
              type={visible ? "text" : "password"}
              required
            />
            <Eye visible={visible} setVisible={setVisible} />
          </div>
          <div className="relative mt-4">
            <input
              onChange={handleChange}
              className="w-full bg-indigo-50 text-indigo-900 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              name="confirmPwd"
              placeholder="Confirm password"
              type={visible ? "text" : "password"}
              required
            />
            <Eye visible={visible} setVisible={setVisible} />
          </div>
          {match ? null : (
            <div className="text-red-600 text-sm mt-2">
              Passwords do not match!
            </div>
          )}
          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg mt-6 hover:bg-indigo-700 transition duration-300 shadow-md hover:shadow-lg"
          >
            Sign Up
          </button>
          <div className="text-center mt-4">
            <span
              onClick={() => route.push("/signin")}
              className="text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
            >
              Already have an account?
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface EyePropType {
  visible: boolean;
  setVisible: Function;
}

export const Eye = ({ visible, setVisible }: EyePropType) => {
  return (
    <button
      onClick={() => setVisible(!visible)}
      className="absolute right-3 top-1/2 transform -translate-y-1/2"
      type="button"
    >
      {visible ? (
        <svg
          className="w-6 h-6 text-indigo-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ) : (
        <svg
          className="w-6 h-6 text-indigo-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
          />
        </svg>
      )}
    </button>
  );
};

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import toast from 'react-hot-toast';
import { useLogin } from "../../hookes/auth/useLogin";



export default function Login() {

    const navigate = useNavigate();
    const { Login, loading } = useLogin();
    const [credentials, setCredentials] = useState({ usernameORemail: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
   
        const {usernameORemail, password} = credentials;
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usernameORemail);

        const body = isEmail
            ? { email: usernameORemail, password }
            : { username: usernameORemail, password };


        try {
            const data = await Login(body);
   console.log(data);
            if (data) {
                navigate("/");
                console.log("working");
            }

        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        setCredentials({
            ...credentials, [e.target.name]: e.target.value
        })
    }


    return (
        <div>
              <div className="min-h-screen flex items-center justify-center px-4 py-10 text-white backdrop-blur-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
             className="bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0  p-8 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md"
                >
                    <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
                        Welcome Back 👋
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Username or Email */}
                        <div>
                            <label className="block mb-1 text-sm font-medium">
                                Username or Email
                            </label>
                            <input
                                type="text"
                                autoComplete="emailOrUsername"
                                name="usernameORemail"
                                onChange={handleChange}
                                value={credentials.usernameORemail}
                                placeholder="Enter your username or email"
                              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block mb-1 text-sm font-medium">Password</label>
                            <input
                                type="password"
                                name="password"
                                autoComplete="password"
                                onChange={handleChange}
                                value={credentials.password}
                                placeholder="Enter your password"
  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div className="text-right">
                            <Link
                                to="/forgot-password"
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={!credentials.password || !credentials.usernameORemail || loading}
                         className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                        >
                            {loading ? "Logging In ..." : "Login"}
                        </button>
                    </form>

                    <p  className="text-sm text-center text-gray-300 mt-6">
                        Don’t have an account?{" "}
                        <Link to="/register" className="text-blue-400 hover:underline font-medium">
                            Sign up
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
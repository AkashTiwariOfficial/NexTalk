import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { useChat } from "../../hookes/context/useChat.jsx";
import { useSigIn } from "../../hookes/auth/useSigIn.jsx";

export default function SignUp() {

  const { host } = useChat();
  const { signIn, loading } = useSigIn();
  const navigate = useNavigate();
  const [signupfields, setSignupfields] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [gender, setGender] = useState("");

  const handleChange = (e) => {
    setSignupfields({
      ...signupfields,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", signupfields.fullName);
    formData.append("username", signupfields.username);
    formData.append("email", signupfields.email);
    formData.append("password", signupfields.password);
    formData.append("confirmPassword", signupfields.confirmPassword);
    formData.append("gender", gender);
    if (avatar) formData.append("avatar", avatar);
    
    try {
      const data = await signIn(formData);

      if (data) {
        navigate("/login");
      }

    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 text-white backdrop-blur-3xl">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0  p-8 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Create an Account 🚀
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-200">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={signupfields.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Username */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-200">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={signupfields.username}
              onChange={handleChange}
              placeholder="Choose a username"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={signupfields.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={signupfields.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-200">
             Confirm  Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={signupfields.confirmPassword}
              onChange={handleChange}
              autoComplete
              placeholder="Confirm your password"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>


          <div>
            <label className="block mb-2 text-sm font-medium text-gray-200">
              Gender
            </label>

            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                  className="accent-blue-500"
                />
                Male
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                  className="accent-blue-500"
                />
                Female
              </label>
            </div>
          </div>

          {/* Avatar */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-200">
              Avatar
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="w-full text-sm text-gray-300 border border-white/20 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />

            {preview && (
              <img
                src={preview}
                alt="Avatar Preview"
                className="w-20 h-20 rounded-full mt-3 object-cover border border-white/30"
              />
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-300 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline font-medium">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
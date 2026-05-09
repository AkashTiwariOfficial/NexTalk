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
   <div
  style={{
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 16px",
    background: "var(--color-x-bg)",
    fontFamily: "var(--font-sans)",
    position: "relative",
    overflow: "hidden",
  }}
>
  {/* Ambient Glow */}
  <div
    style={{
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      overflow: "hidden",
      zIndex: 0,
    }}
  >
    <div
      style={{
        position: "absolute",
        top: "-10%",
        left: "25%",
        width: 500,
        height: 500,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(123,111,255,0.18) 0%, transparent 70%)",
        filter: "blur(50px)",
      }}
    />

    <div
      style={{
        position: "absolute",
        bottom: "-10%",
        right: "20%",
        width: 400,
        height: 400,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(168,85,247,0.14) 0%, transparent 70%)",
        filter: "blur(50px)",
      }}
    />
  </div>

  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    style={{
      position: "relative",
      zIndex: 1,
      width: "100%",
      maxWidth: 460,
      background: "rgba(17,24,39,0.75)",
      backdropFilter: "blur(18px)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 24,
      padding: "36px 32px",
      boxShadow:
        "0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)",
    }}
  >
    {/* Logo */}
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: 22,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 18,
          background:
            "linear-gradient(135deg, var(--color-x-accent), #A855F7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 10px 30px var(--color-x-glow)",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </div>
    </div>

    {/* Heading */}
    <h2
      style={{
        textAlign: "center",
        fontSize: 28,
        fontWeight: 700,
        color: "var(--color-x-t1)",
        marginBottom: 8,
        letterSpacing: "-0.04em",
      }}
    >
      Create Account 🚀
    </h2>

    <p
      style={{
        textAlign: "center",
        fontSize: 13,
        color: "var(--color-x-t2)",
        marginBottom: 28,
      }}
    >
      Join XChat and start chatting instantly
    </p>

    <form
      className="space-y-4"
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {/* Full Name */}
      <div>
        <label className="auth-label">Full Name</label>

        <input
          type="text"
          name="fullName"
          value={signupfields.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          autoComplete="name"
          className="auth-input"
          required
        />
      </div>

      {/* Username */}
      <div>
        <label className="auth-label">Username</label>

        <input
          type="text"
          name="username"
          value={signupfields.username}
          onChange={handleChange}
          placeholder="Choose username"
          autoComplete="username"
          className="auth-input"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="auth-label">Email</label>

        <input
          type="email"
          name="email"
          value={signupfields.email}
          onChange={handleChange}
          placeholder="Enter your email"
          autoComplete="email"
          className="auth-input"
          required
        />
      </div>

      {/* Password */}
      <div>
        <label className="auth-label">Password</label>

        <input
          type="password"
          name="password"
          value={signupfields.password}
          onChange={handleChange}
          placeholder="Enter password"
          autoComplete="new-password"
          className="auth-input"
          required
        />
      </div>

      {/* Confirm Password */}
      <div>
        <label className="auth-label">Confirm Password</label>

        <input
          type="password"
          name="confirmPassword"
          value={signupfields.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm password"
          autoComplete="new-password"
          className="auth-input"
          required
        />
      </div>

      {/* Gender */}
      <div>
        <label className="auth-label">Gender</label>

        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 10,
          }}
        >
          {["male", "female"].map((item) => (
            <label
              key={item}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "12px 16px",
                borderRadius: 12,
                background: "var(--color-x-s3)",
                border: "1px solid var(--color-x-b2)",
                cursor: "pointer",
                color: "var(--color-x-t2)",
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              <input
                type="radio"
                name="gender"
                value={item}
                checked={gender === item}
                onChange={(e) => setGender(e.target.value)}
                style={{ accentColor: "#8b5cf6" }}
              />

              {item.charAt(0).toUpperCase() + item.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {/* Avatar */}
      <div>
        <label className="auth-label">Avatar</label>

        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="auth-file"
        />

        {preview && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 18,
            }}
          >
            <img
              src={preview}
              alt="Preview"
              style={{
                width: 84,
                height: 84,
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid rgba(255,255,255,0.15)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
              }}
            />
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        style={{
          marginTop: 8,
          width: "100%",
          height: 48,
          borderRadius: 14,
          border: "none",
          background: loading
            ? "var(--color-x-s4)"
            : "linear-gradient(135deg, var(--color-x-accent), #A855F7)",
          color: "#fff",
          fontSize: 14,
          fontWeight: 600,
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: loading
            ? "none"
            : "0 10px 30px var(--color-x-glow)",
          transition: "all 0.2s cubic-bezier(.16,1,.3,1)",
        }}
      >
        {loading ? "Creating Account..." : "Sign Up"}
      </button>
    </form>

    {/* Divider */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        margin: "24px 0 18px",
      }}
    >
      <div
        style={{
          flex: 1,
          height: 1,
          background: "var(--color-x-b1)",
        }}
      />

      <span
        style={{
          fontSize: 11,
          color: "var(--color-x-t3)",
        }}
      >
        or
      </span>

      <div
        style={{
          flex: 1,
          height: 1,
          background: "var(--color-x-b1)",
        }}
      />
    </div>

    {/* Footer */}
    <p
      style={{
        textAlign: "center",
        fontSize: 13,
        color: "var(--color-x-t2)",
      }}
    >
      Already have an account?{" "}
      <Link
        to="/login"
        style={{
          color: "var(--color-x-accent)",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        Log in
      </Link>
    </p>
  </motion.div>

  {/* Styles */}
  <style>{`
    .auth-label{
      display:block;
      margin-bottom:8px;
      font-size:12px;
      font-weight:600;
      color:var(--color-x-t2);
      letter-spacing:.04em;
      text-transform:uppercase;
    }

    .auth-input{
      width:100%;
      height:46px;
      padding:0 14px;
      border-radius:12px;
      background:var(--color-x-s3);
      border:1px solid var(--color-x-b2);
      color:var(--color-x-t1);
      font-size:13px;
      outline:none;
      transition:all .18s ease;
      box-sizing:border-box;
      font-family:var(--font-sans);
    }

    .auth-input::placeholder{
      color:var(--color-x-t3);
    }

    .auth-input:focus{
      border-color:var(--color-x-accent);
      box-shadow:0 0 0 3px var(--color-x-glow2);
    }

    .auth-file{
      width:100%;
      padding:12px;
      border-radius:12px;
      background:var(--color-x-s3);
      border:1px solid var(--color-x-b2);
      color:var(--color-x-t2);
      font-size:13px;
      cursor:pointer;
      box-sizing:border-box;
    }

    .auth-file::file-selector-button{
      border:none;
      padding:10px 14px;
      border-radius:10px;
      margin-right:12px;
      background:linear-gradient(135deg,var(--color-x-accent),#A855F7);
      color:white;
      font-weight:600;
      cursor:pointer;
    }
  `}</style>
</div>
  );
}
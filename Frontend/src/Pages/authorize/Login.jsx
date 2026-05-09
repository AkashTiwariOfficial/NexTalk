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

        const { usernameORemail, password } = credentials;
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usernameORemail);

        const body = isEmail
            ? { email: usernameORemail, password }
            : { username: usernameORemail, password };


        try {
            const data = await Login(body);

            if (data) {
                navigate("/");
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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 16px',
      background: 'var(--color-x-bg)',
      fontFamily: 'var(--font-sans)',
    }}>

      {/* Ambient glow blobs */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0,
      }}>
        <div style={{
          position: 'absolute', top: '-10%', left: '30%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(123,111,255,0.18) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', right: '20%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative', zIndex: 1,
          width: '100%', maxWidth: 420,
          background: 'var(--color-x-s1)',
          border: '1px solid var(--color-x-b1)',
          borderRadius: 20,
          padding: '36px 32px',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >

        {/* Logo mark */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: 'linear-gradient(135deg, var(--color-x-accent), #A855F7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px var(--color-x-glow)',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h2 style={{
          textAlign: 'center', marginBottom: 6,
          fontSize: 24, fontWeight: 700,
          color: 'var(--color-x-t1)',
          letterSpacing: '-0.03em',
        }}>
          Welcome back 👋
        </h2>
        <p style={{
          textAlign: 'center', marginBottom: 28,
          fontSize: 13, color: 'var(--color-x-t2)',
        }}>
          Sign in to continue to XChat
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Username or Email */}
          <div>
            <label style={{
              display: 'block', marginBottom: 6,
              fontSize: 12, fontWeight: 600,
              color: 'var(--color-x-t2)',
              letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>
              Username or Email
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)',
                color: 'var(--color-x-t3)', display: 'flex', alignItems: 'center',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </span>
              <input
                type="text"
                autoComplete="emailOrUsername"
                name="usernameORemail"
                onChange={handleChange}
                value={credentials.usernameORemail}
                placeholder="Enter your username or email"
                style={{
                  width: '100%',
                  height: 44,
                  paddingLeft: 38, paddingRight: 14,
                  borderRadius: 11,
                  background: 'var(--color-x-s3)',
                  border: '1px solid var(--color-x-b2)',
                  color: 'var(--color-x-t1)',
                  fontSize: 13,
                  outline: 'none',
                  fontFamily: 'var(--font-sans)',
                  transition: 'border-color 0.15s, box-shadow 0.15s',
                  boxSizing: 'border-box',
                }}
                onFocus={e => {
                  e.target.style.borderColor = 'var(--color-x-accent)'
                  e.target.style.boxShadow = '0 0 0 3px var(--color-x-glow2)'
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'var(--color-x-b2)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label style={{
                fontSize: 12, fontWeight: 600,
                color: 'var(--color-x-t2)',
                letterSpacing: '0.04em', textTransform: 'uppercase',
              }}>
                Password
              </label>
              <Link to="/forgot-password" style={{
                fontSize: 12, color: 'var(--color-x-accent)',
                textDecoration: 'none', fontWeight: 500,
              }}
              onMouseEnter={e => e.target.style.textDecoration = 'underline'}
              onMouseLeave={e => e.target.style.textDecoration = 'none'}
              >
                Forgot password?
              </Link>
            </div>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)',
                color: 'var(--color-x-t3)', display: 'flex', alignItems: 'center',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </span>
              <input
                type="password"
                name="password"
                autoComplete="password"
                onChange={handleChange}
                value={credentials.password}
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  height: 44,
                  paddingLeft: 38, paddingRight: 14,
                  borderRadius: 11,
                  background: 'var(--color-x-s3)',
                  border: '1px solid var(--color-x-b2)',
                  color: 'var(--color-x-t1)',
                  fontSize: 13,
                  outline: 'none',
                  fontFamily: 'var(--font-sans)',
                  transition: 'border-color 0.15s, box-shadow 0.15s',
                  boxSizing: 'border-box',
                }}
                onFocus={e => {
                  e.target.style.borderColor = 'var(--color-x-accent)'
                  e.target.style.boxShadow = '0 0 0 3px var(--color-x-glow2)'
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'var(--color-x-b2)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!credentials.password || !credentials.usernameORemail || loading}
            style={{
              marginTop: 6,
              width: '100%', height: 46,
              borderRadius: 12,
              border: 'none',
              background: (!credentials.password || !credentials.usernameORemail || loading)
                ? 'var(--color-x-s4)'
                : 'linear-gradient(135deg, var(--color-x-accent), #A855F7)',
              color: (!credentials.password || !credentials.usernameORemail || loading)
                ? 'var(--color-x-t3)'
                : '#fff',
              fontSize: 14, fontWeight: 600,
              cursor: (!credentials.password || !credentials.usernameORemail || loading)
                ? 'not-allowed' : 'pointer',
              boxShadow: (!credentials.password || !credentials.usernameORemail || loading)
                ? 'none'
                : '0 6px 20px var(--color-x-glow)',
              transition: 'all 0.2s cubic-bezier(.16,1,.3,1)',
              letterSpacing: '-0.01em',
              fontFamily: 'var(--font-sans)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
            onMouseEnter={e => {
              if (!e.currentTarget.disabled) e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            onMouseDown={e => {
              if (!e.currentTarget.disabled) e.currentTarget.style.transform = 'translateY(1px)'
            }}
          >
            {loading ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                  style={{ animation: 'spin 0.8s linear infinite' }}>
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
                Logging in...
              </>
            ) : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display:'flex', alignItems:'center', gap:12, margin:'20px 0' }}>
          <div style={{ flex:1, height:1, background:'var(--color-x-b1)' }} />
          <span style={{ fontSize:11, color:'var(--color-x-t3)' }}>or</span>
          <div style={{ flex:1, height:1, background:'var(--color-x-b1)' }} />
        </div>

        {/* Sign up link */}
        <p style={{ textAlign:'center', fontSize:13, color:'var(--color-x-t2)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{
            color: 'var(--color-x-accent)', fontWeight: 600, textDecoration: 'none',
          }}
          onMouseEnter={e => e.target.style.textDecoration = 'underline'}
          onMouseLeave={e => e.target.style.textDecoration = 'none'}
          >
            Create account
          </Link>
        </p>

      </motion.div>

      {/* Spin keyframe for loader */}
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
  
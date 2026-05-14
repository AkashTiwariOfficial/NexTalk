import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLogin } from "../../hookes/auth/useLogin";

export default function Login() {
  const navigate = useNavigate();
  const { Login, loading } = useLogin();
  const [credentials, setCredentials] = useState({ usernameORemail: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { usernameORemail, password } = credentials;
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usernameORemail);
    const body = isEmail
      ? { email: usernameORemail, password }
      : { username: usernameORemail, password };
    try {
      const data = await Login(body);
      if (data) navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const isDisabled = !credentials.password || !credentials.usernameORemail || loading;

  return (
    <>
      <style>{`
        @keyframes spin   { to { transform: rotate(360deg); } }
        @keyframes float1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-30px,20px) scale(1.08)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-25px) scale(1.06)} }
        @keyframes float3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-15px,-20px) scale(1.04)} }
        .gc-blob1 { animation: float1 9s  ease-in-out infinite; }
        .gc-blob2 { animation: float2 11s ease-in-out infinite; }
        .gc-blob3 { animation: float3 7s  ease-in-out infinite; }
        .gc-input::placeholder { color: #2E2E48 !important; }
        .gc-input:-webkit-autofill,
        .gc-input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 100px #13131E inset !important;
          -webkit-text-fill-color: #EEEEFF !important;
          caret-color: #EEEEFF;
        }
        .gc-link { color:#7B6FFF; text-decoration:none; font-weight:600; transition:color 0.15s; }
        .gc-link:hover { color:#9D93FF; text-decoration:underline; }
        .gc-forgot { color:#7B6FFF; text-decoration:none; font-weight:500; font-size:12px; }
        .gc-forgot:hover { text-decoration:underline; }
        .gc-eye { background:none; border:none; cursor:pointer; color:#2E2E48;
                  display:flex; align-items:center; padding:4px; border-radius:6px;
                  transition:color 0.15s; }
        .gc-eye:hover { color:#7B6FFF; }
        .gc-newchat:hover { background:#7B6FFF !important; border-color:#7B6FFF !important; color:#fff !important; }
      `}</style>

      {/* Full viewport — perfectly centered */}
      <div style={{
        position: 'fixed', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#08080E',
        fontFamily: '"Inter", system-ui, sans-serif',
        overflow: 'hidden',
      }}>

        {/* Animated background blobs */}
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden' }}>
          <div className="gc-blob1" style={{
            position:'absolute', top:'-15%', left:'20%',
            width:600, height:600, borderRadius:'50%',
            background:'radial-gradient(circle, rgba(123,111,255,0.2) 0%, transparent 65%)',
            filter:'blur(50px)',
          }}/>
          <div className="gc-blob2" style={{
            position:'absolute', bottom:'-20%', right:'10%',
            width:500, height:500, borderRadius:'50%',
            background:'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 65%)',
            filter:'blur(50px)',
          }}/>
          <div className="gc-blob3" style={{
            position:'absolute', top:'40%', left:'-10%',
            width:350, height:350, borderRadius:'50%',
            background:'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 65%)',
            filter:'blur(40px)',
          }}/>
          {/* Grid */}
          <div style={{
            position:'absolute', inset:0,
            backgroundImage:`
              linear-gradient(rgba(123,111,255,0.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(123,111,255,0.035) 1px, transparent 1px)
            `,
            backgroundSize:'48px 48px',
          }}/>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity:0, y:28, scale:0.97 }}
          animate={{ opacity:1, y:0,  scale:1    }}
          transition={{ duration:0.5, ease:[0.16,1,0.3,1] }}
          style={{
            position:'relative', zIndex:1,
            width:'100%', maxWidth:420,
            margin:'0 16px',
            background:'linear-gradient(160deg, #13131E 0%, #0F0F18 100%)',
            border:'1px solid #1A1A2E',
            borderRadius:22,
            padding:'40px 36px',
            boxShadow:`
              0 0 0 1px rgba(255,255,255,0.04),
              0 24px 80px rgba(0,0,0,0.65),
              inset 0 1px 0 rgba(255,255,255,0.05)
            `,
          }}
        >

          {/* Top shimmer line */}
          <div style={{
            position:'absolute', top:0, left:'15%', right:'15%', height:1,
            background:'linear-gradient(90deg, transparent, rgba(123,111,255,0.7), transparent)',
            borderRadius:99,
          }}/>

          {/* Logo */}
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', marginBottom:28 }}>
            <div style={{
              width:54, height:54, borderRadius:16,
              background:'linear-gradient(135deg, #7B6FFF, #A855F7)',
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'0 8px 32px rgba(123,111,255,0.45), inset 0 1px 0 rgba(255,255,255,0.2)',
              marginBottom:18,
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>

            <h2 style={{
              margin:0, fontSize:23, fontWeight:700,
              color:'#EEEEFF', letterSpacing:'-0.03em', lineHeight:1,
            }}>
              Welcome back 👋
            </h2>
            <p style={{ margin:'7px 0 0', fontSize:13, color:'#4A4A6A' }}>
              Sign in to continue to XChat
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:14 }}>

            {/* ── Username / Email ── */}
            <div>
              <label style={labelStyle}>Username or Email</label>
              <div style={{ position:'relative' }}>
                <span style={iconWrap}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
                <SmartInput
                  type="text"
                  name="usernameORemail"
                  autoComplete="username"
                  placeholder="Username or email"
                  value={credentials.usernameORemail}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* ── Password ── */}
            <div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
                <label style={labelStyle}>Password</label>
                <Link to="/forgot-password" className="gc-forgot">Forgot password?</Link>
              </div>
              <div style={{ position:'relative' }}>
                <span style={iconWrap}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="11" width="18" height="11" rx="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <SmartInput
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={handleChange}
                  paddingRight={44}
                />
                <button
                  type="button"
                  className="gc-eye"
                  onClick={() => setShowPassword(p => !p)}
                  style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)' }}
                >
                  {showPassword
                    ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>

            {/* ── Submit ── */}
            <button
              type="submit"
              disabled={isDisabled}
              style={{
                marginTop:6,
                width:'100%', height:48,
                borderRadius:13, border:'none',
                background: isDisabled
                  ? '#1A1A2E'
                  : 'linear-gradient(135deg, #7B6FFF 0%, #A855F7 100%)',
                color: isDisabled ? '#2E2E48' : '#fff',
                fontSize:14, fontWeight:600,
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                boxShadow: isDisabled ? 'none' : '0 8px 28px rgba(123,111,255,0.45)',
                transition:'all 0.2s cubic-bezier(.16,1,.3,1)',
                letterSpacing:'-0.01em',
                display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                position:'relative', overflow:'hidden',
              }}
              onMouseEnter={e => {
                if (!isDisabled) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 14px 36px rgba(123,111,255,0.55)'
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = isDisabled ? 'none' : '0 8px 28px rgba(123,111,255,0.45)'
              }}
              onMouseDown={e => { if (!isDisabled) e.currentTarget.style.transform = 'translateY(1px)' }}
              onMouseUp={e => { if (!isDisabled) e.currentTarget.style.transform = 'translateY(-1px)' }}
            >
              {/* Shine streak */}
              {!isDisabled && (
                <div style={{
                  position:'absolute', inset:0,
                  background:'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.1) 50%, transparent 65%)',
                  pointerEvents:'none', borderRadius:13,
                }}/>
              )}

              {loading
                ? <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                      style={{ animation:'spin 0.8s linear infinite' }}>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    Signing in...
                  </>
                : 'Sign In →'
              }
            </button>
          </form>

          {/* Divider */}
          <div style={{ display:'flex', alignItems:'center', gap:12, margin:'22px 0 18px' }}>
            <div style={{ flex:1, height:1, background:'linear-gradient(90deg,transparent,#1A1A2E)' }}/>
            <span style={{ fontSize:11, color:'#2E2E48', letterSpacing:'0.06em', textTransform:'uppercase' }}>or</span>
            <div style={{ flex:1, height:1, background:'linear-gradient(90deg,#1A1A2E,transparent)' }}/>
          </div>

          {/* Register link */}
          <p style={{ margin:0, textAlign:'center', fontSize:13, color:'#4A4A6A' }}>
            Don't have an account?{' '}
            <Link to="/register" className="gc-link">Create account</Link>
          </p>

        </motion.div>
      </div>
    </>
  );
}

/* ── Helpers ──────────────────────────────────────────────────────────────── */

const labelStyle = {
  display:'block', marginBottom:6,
  fontSize:11, fontWeight:600,
  color:'#4A4A6A',
  letterSpacing:'0.08em', textTransform:'uppercase',
}

const iconWrap = {
  position:'absolute', left:13, top:'50%', transform:'translateY(-50%)',
  color:'#2E2E48', display:'flex', alignItems:'center', pointerEvents:'none', zIndex:1,
}

function SmartInput({ paddingRight = 14, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      {...props}
      className="gc-input"
      onFocus={e => { setFocused(true);  props.onFocus?.(e) }}
      onBlur={e  => { setFocused(false); props.onBlur?.(e)  }}
      style={{
        width:'100%', height:46,
        paddingLeft:38, paddingRight,
        borderRadius:12,
        background:'#0F0F18',
        border:`1px solid ${focused ? '#7B6FFF' : '#1A1A2E'}`,
        boxShadow: focused
          ? '0 0 0 3px rgba(123,111,255,0.14), inset 0 1px 2px rgba(0,0,0,0.3)'
          : 'inset 0 1px 3px rgba(0,0,0,0.4)',
        color:'#EEEEFF',
        fontSize:13,
        outline:'none',
        fontFamily:'"Inter", system-ui, sans-serif',
        transition:'border-color 0.15s, box-shadow 0.15s',
        boxSizing:'border-box',
      }}
    />
  )
}
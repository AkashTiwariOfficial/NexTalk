import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useChat } from "../../hookes/context/useChat.jsx";
import { useSigIn } from "../../hookes/auth/useSigIn.jsx";

export default function SignUp() {
  const { host } = useChat();
  const { signIn, loading } = useSigIn();
  const navigate = useNavigate();

  const [signupfields, setSignupfields] = useState({
    fullName: "", username: "", email: "", password: "", confirmPassword: "",
  });
  const [avatar,  setAvatar]  = useState(null);
  const [preview, setPreview] = useState(null);
  const [gender,  setGender]  = useState("");
  const [showPw,  setShowPw]  = useState(false);
  const [showCpw, setShowCpw] = useState(false);

  const handleChange = (e) =>
    setSignupfields({ ...signupfields, [e.target.name]: e.target.value });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName",        signupfields.fullName);
    formData.append("username",        signupfields.username);
    formData.append("email",           signupfields.email);
    formData.append("password",        signupfields.password);
    formData.append("confirmPassword", signupfields.confirmPassword);
    formData.append("gender",          gender);
    if (avatar) formData.append("avatar", avatar);
    try {
      const data = await signIn(formData);
      if (data) navigate("/login");
    } catch (error) { console.log(error); }
  };

  const isDisabled = loading || !gender || !signupfields.fullName ||
    !signupfields.username || !signupfields.email ||
    !signupfields.password || !signupfields.confirmPassword;

  return (
    <>
      <style>{`
        @keyframes spin   { to { transform:rotate(360deg); } }
        @keyframes float1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-24px,16px)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-20px)} }
        .su-b1 { animation:float1 10s ease-in-out infinite; }
        .su-b2 { animation:float2 13s ease-in-out infinite; }

        .su-input {
          width:100%; height:42px;
          padding:0 14px 0 36px;
          border-radius:10px;
          background:#0A0A14;
          border:1px solid #1A1A2E;
          color:#EEEEFF; font-size:13px; outline:none;
          font-family:"Inter",system-ui,sans-serif;
          transition:border-color .15s, box-shadow .15s;
          box-sizing:border-box;
        }
        .su-input::placeholder { color:#2A2A42; }
        .su-input:focus {
          border-color:#7B6FFF;
          box-shadow:0 0 0 3px rgba(123,111,255,0.13);
        }
        .su-input:-webkit-autofill {
          -webkit-box-shadow:0 0 0 100px #0A0A14 inset !important;
          -webkit-text-fill-color:#EEEEFF !important;
        }

        .su-label {
          display:block; margin-bottom:5px;
          font-size:10px; font-weight:600; color:#3A3A58;
          letter-spacing:0.1em; text-transform:uppercase;
        }

        .su-gender {
          flex:1; display:flex; align-items:center; justify-content:center;
          gap:7px; padding:9px 14px; border-radius:10px;
          background:#0A0A14; border:1px solid #1A1A2E;
          cursor:pointer; color:#3A3A58;
          font-size:12px; font-weight:500;
          transition:all .15s; user-select:none;
        }
        .su-gender:hover { border-color:#7B6FFF; color:#EEEEFF; }
        .su-gender.sel {
          border-color:#7B6FFF;
          background:rgba(123,111,255,0.1);
          color:#EEEEFF;
          box-shadow:0 0 0 1px #7B6FFF;
        }

        .su-eye {
          position:absolute; right:10px; top:50%; transform:translateY(-50%);
          background:none; border:none; cursor:pointer; color:#2A2A42;
          display:flex; align-items:center; padding:3px; border-radius:5px;
          transition:color .15s;
        }
        .su-eye:hover { color:#7B6FFF; }

        .su-link { color:#7B6FFF; font-weight:600; text-decoration:none; }
        .su-link:hover { color:#9D93FF; text-decoration:underline; }

        .su-upload {
          width:100%; padding:10px 14px; border-radius:10px;
          background:#0A0A14; border:1px dashed #252540;
          display:flex; align-items:center; gap:10px;
          cursor:pointer; transition:border-color .15s;
          box-sizing:border-box;
        }
        .su-upload:hover { border-color:#7B6FFF; }

        .su-field { display:flex; flex-direction:column; }
        .su-icon  { position:absolute; left:11px; top:50%; transform:translateY(-50%); color:#2A2A42; display:flex; align-items:center; pointer-events:none; z-index:1; }
      `}</style>

      {/* Full-screen */}
      <div style={{
        position:'fixed', inset:0,
        display:'flex', alignItems:'center', justifyContent:'center',
        background:'#08080E',
        fontFamily:'"Inter",system-ui,sans-serif',
        overflow:'hidden',
        padding:'0 16px',
      }}>

        {/* Blobs */}
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden' }}>
          <div className="su-b1" style={{ position:'absolute', top:'-20%', left:'10%', width:700, height:700, borderRadius:'50%', background:'radial-gradient(circle,rgba(123,111,255,0.15) 0%,transparent 65%)', filter:'blur(60px)' }}/>
          <div className="su-b2" style={{ position:'absolute', bottom:'-20%', right:'5%', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(168,85,247,0.12) 0%,transparent 65%)', filter:'blur(60px)' }}/>
          <div style={{ position:'absolute', inset:0, backgroundImage:`linear-gradient(rgba(123,111,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(123,111,255,0.025) 1px,transparent 1px)`, backgroundSize:'52px 52px' }}/>
        </div>

        {/* ── Wide rectangular card ──────────────────────────── */}
        <motion.div
          initial={{ opacity:0, y:24, scale:0.97 }}
          animate={{ opacity:1, y:0,  scale:1    }}
          transition={{ duration:0.5, ease:[0.16,1,0.3,1] }}
          style={{
            position:'relative', zIndex:1,
            width:'100%', maxWidth:860,
            background:'linear-gradient(160deg,#111118 0%,#0D0D15 100%)',
            border:'1px solid #1A1A2E',
            borderRadius:22,
            boxShadow:`0 0 0 1px rgba(255,255,255,0.04), 0 32px 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)`,
            overflow:'hidden',
            display:'flex',
          }}
        >
          {/* Top shimmer */}
          <div style={{ position:'absolute', top:0, left:'20%', right:'20%', height:1, background:'linear-gradient(90deg,transparent,rgba(123,111,255,0.6),transparent)', zIndex:2 }}/>

          {/* ── LEFT PANEL — branding ──────────────────────────── */}
          <div style={{
            width:240, minWidth:240,
            background:'linear-gradient(160deg,rgba(123,111,255,0.12) 0%,rgba(168,85,247,0.06) 100%)',
            borderRight:'1px solid #1A1A2E',
            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
            padding:'40px 28px',
            position:'relative',
            gap:0,
          }}>
            {/* Glow behind logo */}
            <div style={{ position:'absolute', top:'30%', left:'50%', transform:'translate(-50%,-50%)', width:200, height:200, borderRadius:'50%', background:'radial-gradient(circle,rgba(123,111,255,0.25) 0%,transparent 70%)', filter:'blur(30px)', pointerEvents:'none' }}/>

            <div style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
              {/* Logo icon */}
              <div style={{ width:60, height:60, borderRadius:18, background:'linear-gradient(135deg,#7B6FFF,#A855F7)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 12px 40px rgba(123,111,255,0.5), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>

              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:22, fontWeight:700, color:'#EEEEFF', letterSpacing:'-0.03em', lineHeight:1 }}>XChat</div>
                <div style={{ fontSize:12, color:'#5A5A80', marginTop:5, lineHeight:1.4 }}>Create your account<br/>and start chatting</div>
              </div>

              {/* Feature pills */}
              <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:8, width:'100%' }}>
                {[
                  { icon:'💬', text:'Real-time messaging' },
                  { icon:'🔒', text:'End-to-end encrypted' },
                  { icon:'⚡', text:'Instant notifications' },
                ].map(f => (
                  <div key={f.text} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 12px', borderRadius:10, background:'rgba(123,111,255,0.07)', border:'1px solid rgba(123,111,255,0.12)' }}>
                    <span style={{ fontSize:14 }}>{f.icon}</span>
                    <span style={{ fontSize:11, color:'#6A6A90', fontWeight:500 }}>{f.text}</span>
                  </div>
                ))}
              </div>

              {/* Avatar preview */}
              {preview && (
                <div style={{ marginTop:8 }}>
                  <img src={preview} alt="Avatar" style={{ width:64, height:64, borderRadius:'50%', objectFit:'cover', border:'2px solid rgba(123,111,255,0.5)', boxShadow:'0 8px 24px rgba(123,111,255,0.35)' }}/>
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT PANEL — form ──────────────────────────────── */}
          <div style={{ flex:1, padding:'36px 36px 32px', display:'flex', flexDirection:'column', justifyContent:'center', minWidth:0 }}>

            <div style={{ marginBottom:24 }}>
              <h2 style={{ margin:0, fontSize:21, fontWeight:700, color:'#EEEEFF', letterSpacing:'-0.03em' }}>Create Account 🚀</h2>
              <p style={{ margin:'5px 0 0', fontSize:12, color:'#4A4A6A' }}>Fill in your details to get started</p>
            </div>

            <form onSubmit={handleSubmit}>

              {/* ── Row 1: Full Name + Username ── */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 }}>
                <SuField label="Full Name" icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}>
                  <input className="su-input" type="text" name="fullName" value={signupfields.fullName} onChange={handleChange} placeholder="Full name" autoComplete="name" required />
                </SuField>

                <SuField label="Username" icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M6 20v-1a6 6 0 0 1 12 0v1"/></svg>}>
                  <input className="su-input" type="text" name="username" value={signupfields.username} onChange={handleChange} placeholder="Username" autoComplete="username" required />
                </SuField>
              </div>

              {/* ── Row 2: Email (full width) ── */}
              <div style={{ marginBottom:12 }}>
                <SuField label="Email" icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}>
                  <input className="su-input" type="email" name="email" value={signupfields.email} onChange={handleChange} placeholder="Email address" autoComplete="email" required />
                </SuField>
              </div>

              {/* ── Row 3: Password + Confirm ── */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:14 }}>
                <SuField label="Password" icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}>
                  <input className="su-input" style={{ paddingRight:38 }} type={showPw ? 'text' : 'password'} name="password" value={signupfields.password} onChange={handleChange} placeholder="Password" autoComplete="new-password" required />
                  <button type="button" className="su-eye" onClick={() => setShowPw(p => !p)}><EyeIcon show={showPw}/></button>
                </SuField>

                <SuField label="Confirm Password" icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}>
                  <input className="su-input" style={{ paddingRight:38 }} type={showCpw ? 'text' : 'password'} name="confirmPassword" value={signupfields.confirmPassword} onChange={handleChange} placeholder="Confirm" autoComplete="new-password" required />
                  <button type="button" className="su-eye" onClick={() => setShowCpw(p => !p)}><EyeIcon show={showCpw}/></button>
                </SuField>
              </div>

              {/* ── Row 4: Gender + Avatar ── */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:20 }}>

                {/* Gender */}
                <div className="su-field">
                  <label className="su-label">Gender</label>
                  <div style={{ display:'flex', gap:8, flex:1 }}>
                    {[{v:'male',e:'♂',l:'Male'},{v:'female',e:'♀',l:'Female'}].map(g => (
                      <label key={g.v} className={`su-gender ${gender===g.v?'sel':''}`} style={{ flex:1 }}>
                        <input type="radio" name="gender" value={g.v} checked={gender===g.v} onChange={e => setGender(e.target.value)} style={{ display:'none' }} />
                        <span style={{ fontSize:13 }}>{g.e}</span>{g.l}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Avatar */}
                <div className="su-field">
                  <label className="su-label">Avatar <span style={{ color:'#2A2A42', fontWeight:400, textTransform:'none', letterSpacing:0 }}>— optional</span></label>
                  {preview ? (
                    <div style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 12px', borderRadius:10, background:'#0A0A14', border:'1px solid #1A1A2E', flex:1 }}>
                      <img src={preview} alt="Preview" style={{ width:36, height:36, borderRadius:'50%', objectFit:'cover', border:'2px solid rgba(123,111,255,0.5)', flexShrink:0 }}/>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:12, fontWeight:500, color:'#EEEEFF', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{avatar?.name}</div>
                        <div style={{ fontSize:10, color:'#4A4A6A' }}>{avatar ? `${(avatar.size/1024).toFixed(1)} KB` : ''}</div>
                      </div>
                      <button type="button" onClick={() => { setAvatar(null); setPreview(null) }}
                        style={{ background:'none', border:'none', color:'#4A4A6A', cursor:'pointer', fontSize:16, lineHeight:1, transition:'color .15s', flexShrink:0 }}
                        onMouseEnter={e => e.currentTarget.style.color='#EF4444'}
                        onMouseLeave={e => e.currentTarget.style.color='#4A4A6A'}
                      >×</button>
                    </div>
                  ) : (
                    <label className="su-upload" style={{ flex:1 }}>
                      <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display:'none' }} />
                      <div style={{ width:30, height:30, borderRadius:8, background:'rgba(123,111,255,0.1)', border:'1px solid rgba(123,111,255,0.25)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7B6FFF" strokeWidth="2" strokeLinecap="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                      </div>
                      <div>
                        <div style={{ fontSize:12, color:'#6A6A90', fontWeight:500 }}>Upload photo</div>
                        <div style={{ fontSize:10, color:'#2A2A42', marginTop:1 }}>PNG, JPG</div>
                      </div>
                    </label>
                  )}
                </div>
              </div>

              {/* ── Submit ── */}
              <button
                type="submit"
                disabled={isDisabled}
                style={{
                  width:'100%', height:46, borderRadius:12, border:'none',
                  background: isDisabled ? '#131320' : 'linear-gradient(135deg,#7B6FFF,#A855F7)',
                  color: isDisabled ? '#2A2A42' : '#fff',
                  fontSize:14, fontWeight:600,
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  boxShadow: isDisabled ? 'none' : '0 8px 28px rgba(123,111,255,0.4)',
                  transition:'all .2s cubic-bezier(.16,1,.3,1)',
                  display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                  position:'relative', overflow:'hidden',
                  fontFamily:'"Inter",system-ui,sans-serif',
                }}
                onMouseEnter={e => { if (!isDisabled) { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 14px 36px rgba(123,111,255,0.5)' } }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow = isDisabled ? 'none' : '0 8px 28px rgba(123,111,255,0.4)' }}
                onMouseDown={e => { if (!isDisabled) e.currentTarget.style.transform='translateY(1px)' }}
                onMouseUp={e => { if (!isDisabled) e.currentTarget.style.transform='translateY(-1px)' }}
              >
                {!isDisabled && <div style={{ position:'absolute', inset:0, borderRadius:12, background:'linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.1) 50%,transparent 65%)', pointerEvents:'none' }}/>}
                {loading
                  ? <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation:'spin 0.8s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Creating Account...</>
                  : 'Create Account →'
                }
              </button>

              {/* Footer */}
              <p style={{ margin:'16px 0 0', textAlign:'center', fontSize:13, color:'#4A4A6A' }}>
                Already have an account?{' '}
                <Link to="/login" className="su-link">Sign in</Link>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
}

function SuField({ label, icon, children }) {
  return (
    <div className="su-field">
      <label className="su-label">{label}</label>
      <div style={{ position:'relative', display:'flex', alignItems:'center' }}>
        <span className="su-icon">{icon}</span>
        {children}
      </div>
    </div>
  );
}

function EyeIcon({ show }) {
  return show
    ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
    : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
}
/**
 * ProfilePanel.jsx
 *
 * WhatsApp-style profile panel that replaces the sidebar.
 * 4 main menu items → each opens its own sub-panel with slide animation.
 *
 * Props:
 *   currUser   — user object { fullName, username, email, avatar }
 *   onBack     — callback to go back to contact list / close panel
 *   onLogout   — callback to handle logout
 *   onUpdateField(changedFields)  — patch account details
 *   onUpdateAvatar(file)          — patch avatar
 *   onChangePassword()            — navigate to change-password
 *   onRefreshToken()              — refresh token handler
 *   onDeleteAccount()             — delete account handler
 */

import React, { useState } from "react";

/* ─── tiny helpers ─────────────────────────────────────────────────────── */

function Icon({ d, size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
    </svg>
  );
}

const ICONS = {
  back:     "M19 12H5M12 5l-7 7 7 7",
  profile:  ["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  account:  ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"],
  notif:    ["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 0 1-3.46 0"],
  logout:   "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
  chevron:  "M9 18l6-6-6-6",
  pencil:   ["M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"],
  camera:   ["M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z", "M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  lock:     ["M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z", "M7 11V7a5 5 0 0 1 10 0v4"],
  refresh:  "M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
  trash:    ["M3 6h18", "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"],
  bell:     ["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 0 1-3.46 0"],
  check:    "M20 6L9 17l-5-5",
  x:        "M18 6L6 18M6 6l12 12",
  user:     ["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  at:       ["M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z", "M15.5 12a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0zM15.5 12v1.5a2 2 0 0 0 4 0V12"],
  mail:     ["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z", "M22 6l-10 7L2 6"],
  vol:      ["M11 5L6 9H2v6h4l5 4V5z", "M15.54 8.46a5 5 0 0 1 0 7.07"],
  moon:     "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z",
  sun:      ["M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42","M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"],
};

/* ─── shared sub-components ────────────────────────────────────────────── */

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={() => onChange(!on)}
      aria-checked={on}
      role="switch"
      style={{
        width: 40, height: 22, borderRadius: 99, border: "none",
        background: on ? "#7B6FFF" : "#252540",
        cursor: "pointer", position: "relative", flexShrink: 0,
        transition: "background .2s",
      }}
    >
      <div style={{
        position: "absolute", top: 3,
        left: on ? "calc(100% - 19px)" : 3,
        width: 16, height: 16, borderRadius: "50%", background: "#fff",
        transition: "left .2s",
      }} />
    </button>
  );
}

function IconBox({ color = "#7B6FFF", bg = "rgba(123,111,255,0.12)", children }) {
  return (
    <div style={{
      width: 34, height: 34, borderRadius: 10,
      background: bg, color, display: "flex",
      alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      {children}
    </div>
  );
}

function Row({ icon, iconColor, iconBg, label, sub, right, onClick, danger }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "12px 16px",
        cursor: onClick ? "pointer" : "default",
        background: hov && onClick
          ? danger ? "rgba(239,68,68,0.07)" : "#141422"
          : "transparent",
        transition: "background .12s",
        borderBottom: "1px solid #0A0A14",
      }}
    >
      <IconBox color={iconColor ?? (danger ? "#EF4444" : "#7B6FFF")} bg={iconBg ?? (danger ? "rgba(239,68,68,0.1)" : "rgba(123,111,255,0.12)")}>
        {icon}
      </IconBox>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, color: danger ? "#EF4444" : "#EEEEFF", fontWeight: 400 }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: danger ? "#7A2020" : "#4A4A6A", marginTop: 2 }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

function PanelHeader({ title, onBack }) {
  return (
    <div style={{
      height: 52, background: "#111120", borderBottom: "1px solid #1A1A2E",
      display: "flex", alignItems: "center", padding: "0 14px", gap: 10, flexShrink: 0,
    }}>
      <button
        onClick={onBack}
        aria-label="Back"
        style={{
          width: 28, height: 28, borderRadius: 8, background: "#181828",
          border: "1px solid #1A1A2E", display: "flex", alignItems: "center",
          justifyContent: "center", cursor: "pointer", flexShrink: 0,
          color: "#8888AA", transition: "border-color .15s",
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = "#7B6FFF"}
        onMouseLeave={e => e.currentTarget.style.borderColor = "#1A1A2E"}
      >
        <Icon d={ICONS.back} size={14} />
      </button>
      <span style={{ fontSize: 14, fontWeight: 500, color: "#EEEEFF" }}>{title}</span>
    </div>
  );
}

const scroll = {
  flex: 1, overflowY: "auto", minHeight: 0,
};
const scrollCSS = `
  .pp-scroll::-webkit-scrollbar { width: 3px; }
  .pp-scroll::-webkit-scrollbar-thumb { background: #252540; border-radius: 99px; }
  .pp-scroll::-webkit-scrollbar-thumb:hover { background: #7B6FFF; }
  .pp-input {
    width:100%; height:42px; padding:0 14px 0 36px;
    border-radius:10px; background:#0A0A14;
    border:1px solid #1A1A2E; color:#EEEEFF; font-size:13px;
    outline:none; font-family:inherit;
    transition:border-color .15s, box-shadow .15s; box-sizing:border-box;
  }
  .pp-input::placeholder { color:#2A2A42; }
  .pp-input:focus { border-color:#7B6FFF; box-shadow:0 0 0 3px rgba(123,111,255,0.13); }
  .pp-row-hover:hover { background:#141422; }
  @keyframes slideIn {
    from { opacity:0; transform:translateX(20px); }
    to   { opacity:1; transform:translateX(0); }
  }
  .pp-slide { animation: slideIn 0.22s cubic-bezier(.16,1,.3,1) forwards; }
`;

/* ─── Avatar section used in both main & profile sub ───────────────────── */
function AvatarHero({ avatarUrl, name, username, onAvatarChange, small = false }) {
  const [hov, setHov] = useState(false);
  const size = small ? 64 : 82;

  return (
    <div style={{
      background: "#111120", padding: small ? "16px 16px 14px" : "28px 16px 22px",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
      borderBottom: "1px solid #1A1A2E",
    }}>
      <div
        style={{ position: "relative", cursor: "pointer" }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onClick={() => document.getElementById("pp-av-file").click()}
        title="Change photo"
      >
        {/* Avatar circle */}
        <div style={{
          width: size, height: size, borderRadius: "50%",
          background: avatarUrl ? "transparent" : "linear-gradient(135deg,#7B6FFF,#A855F7)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: size * 0.28, fontWeight: 500, color: "#fff",
          border: "2.5px solid #7B6FFF",
          outline: "3px solid #111120",
          overflow: "hidden",
          filter: hov ? "brightness(0.55)" : "none",
          transition: "filter .2s",
        }}>
          {avatarUrl
            ? <img src={avatarUrl} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : name?.slice(0, 2).toUpperCase()
          }
        </div>
        {/* Camera overlay */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3,
          opacity: hov ? 1 : 0, transition: "opacity .2s", pointerEvents: "none",
        }}>
          <Icon d={ICONS.camera} size={18} />
          <span style={{ fontSize: 9, color: "#fff", fontWeight: 600, letterSpacing: "0.06em" }}>CHANGE</span>
        </div>
        <input id="pp-av-file" type="file" accept="image/*" onChange={onAvatarChange} style={{ display: "none" }} />
      </div>

      {!small && (
        <>
          <div style={{ fontSize: 20, fontWeight: 500, color: "#EEEEFF", letterSpacing: "-0.02em", textAlign: "center" }}>
            {name}
          </div>
          {username && (
            <div style={{ fontSize: 12, color: "#4A4A6A" }}>@{username}</div>
          )}
        </>
      )}
    </div>
  );
}

/* ─── Editable field row ────────────────────────────────────────────────── */
function EditableRow({ fieldKey, label, value, iconPath, onSave }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);
  const [hov, setHov] = useState(false);

  const handleSave = () => {
    if (!val.trim()) return;
    onSave(fieldKey, val.trim());
    setEditing(false);
  };
  const handleCancel = () => {
    setVal(value);
    setEditing(false);
  };

  return (
    <div
      style={{
        padding: "12px 16px",
        borderBottom: "1px solid #0A0A14",
        background: hov && !editing ? "#141422" : "transparent",
        transition: "background .12s",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* icon */}
        <div style={{ color: "#3A3A58", display: "flex", alignItems: "center", flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {Array.isArray(iconPath)
              ? iconPath.map((p, i) => <path key={i} d={p} />)
              : <path d={iconPath} />
            }
          </svg>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: "#7B6FFF", letterSpacing: "0.09em", textTransform: "uppercase", marginBottom: 2 }}>
            {label}
          </div>
          {editing ? (
            <input
              className="pp-input"
              style={{ paddingLeft: 10, marginTop: 4 }}
              value={val}
              onChange={e => setVal(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") handleSave(); if (e.key === "Escape") handleCancel(); }}
              autoFocus
            />
          ) : (
            <div style={{ fontSize: 13, color: "#EEEEFF", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {value}
            </div>
          )}
        </div>

        {/* edit / save / cancel */}
        {editing ? (
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            <button
              onClick={handleSave}
              style={{
                height: 28, padding: "0 10px", borderRadius: 8, border: "none",
                background: "linear-gradient(135deg,#7B6FFF,#A855F7)", color: "#fff",
                fontSize: 11, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5,
              }}
            >
              <Icon d={ICONS.check} size={11} /> Save
            </button>
            <button
              onClick={handleCancel}
              style={{
                height: 28, width: 28, borderRadius: 8,
                background: "#1A1A2E", border: "1px solid #252540",
                color: "#8888AA", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <Icon d={ICONS.x} size={11} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            aria-label={`Edit ${label}`}
            style={{
              width: 28, height: 28, borderRadius: 8,
              background: "rgba(123,111,255,0.1)", border: "1px solid rgba(123,111,255,0.2)",
              color: "#7B6FFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all .15s", flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(123,111,255,0.22)"; e.currentTarget.style.borderColor = "#7B6FFF"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(123,111,255,0.1)"; e.currentTarget.style.borderColor = "rgba(123,111,255,0.2)"; }}
          >
            <Icon d={ICONS.pencil} size={12} />
          </button>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SUB PANELS
═══════════════════════════════════════════════════════════════════════════ */

/* ── Profile sub-panel ─────────────────────────────────────────────────── */
function ProfileSub({ currUser, avatarUrl, onBack, onAvatarChange, onSaveField }) {
  return (
    <div className="pp-slide" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <PanelHeader title="Profile" onBack={onBack} />
      <div className="pp-scroll" style={scroll}>
        <AvatarHero
          avatarUrl={avatarUrl}
          name={currUser.fullName}
          username={currUser.username}
          onAvatarChange={onAvatarChange}
        />
        <div style={{ paddingTop: 4 }}>
          <EditableRow
            fieldKey="fullName"
            label="Full Name"
            value={currUser.fullName}
            iconPath={ICONS.user}
            onSave={onSaveField}
          />
          <EditableRow
            fieldKey="username"
            label="Username"
            value={currUser.username}
            iconPath={ICONS.at}
            onSave={onSaveField}
          />
          <EditableRow
            fieldKey="email"
            label="Email"
            value={currUser.email}
            iconPath={ICONS.mail}
            onSave={onSaveField}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Account sub-panel ─────────────────────────────────────────────────── */
function AccountSub({ onBack, onChangePassword, onRefreshToken, onDeleteAccount }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="pp-slide" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <PanelHeader title="Account" onBack={onBack} />
      <div className="pp-scroll" style={scroll}>
        <Row
          icon={<Icon d={ICONS.lock} size={15} />}
          iconColor="#8888AA" iconBg="#181828"
          label="Change password"
          onClick={onChangePassword}
          right={<Icon d={ICONS.chevron} size={14} />}
        />
        <Row
          icon={<Icon d={ICONS.refresh} size={15} />}
          iconColor="#8888AA" iconBg="#181828"
          label="Refresh token"
          sub="Generate new session token"
          onClick={onRefreshToken}
          right={<Icon d={ICONS.chevron} size={14} />}
        />

        {/* Delete account with confirmation */}
        {!confirmDelete ? (
          <Row
            icon={<Icon d={ICONS.trash} size={15} />}
            label="Delete account"
            sub="This cannot be undone"
            danger
            onClick={() => setConfirmDelete(true)}
          />
        ) : (
          <div style={{ margin: 12, border: "1px solid rgba(239,68,68,0.3)", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "12px 14px", background: "rgba(239,68,68,0.06)" }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#EF4444", marginBottom: 4 }}>Are you sure?</div>
              <div style={{ fontSize: 11, color: "#7A3030", lineHeight: 1.5 }}>
                Your account and all data will be permanently deleted.
              </div>
            </div>
            <div style={{ display: "flex", gap: 0 }}>
              <button
                onClick={() => setConfirmDelete(false)}
                style={{
                  flex: 1, height: 38, background: "#1A1A2E", border: "none",
                  borderTop: "1px solid #2A1010", color: "#8888AA",
                  fontSize: 12, fontWeight: 500, cursor: "pointer",
                  borderRight: "1px solid #2A1010",
                }}
              >
                Cancel
              </button>
              <button
                onClick={onDeleteAccount}
                style={{
                  flex: 1, height: 38, background: "rgba(239,68,68,0.15)", border: "none",
                  borderTop: "1px solid #2A1010", color: "#EF4444",
                  fontSize: 12, fontWeight: 600, cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Notifications sub-panel ───────────────────────────────────────────── */
function NotificationsSub({ onBack }) {
  const [prefs, setPrefs] = useState({ messages: true, sound: true, dnd: false });
  const toggle = key => setPrefs(p => ({ ...p, [key]: !p[key] }));

  const items = [
    { key: "messages", icon: ICONS.bell,  iconColor: "#EF9F27", iconBg: "rgba(239,159,39,0.12)", label: "Message alerts",     sub: "New messages & mentions" },
    { key: "sound",    icon: ICONS.vol,   iconColor: "#EF9F27", iconBg: "rgba(239,159,39,0.12)", label: "Sound",              sub: "Play notification sounds" },
    { key: "dnd",      icon: ICONS.moon,  iconColor: "#8888AA", iconBg: "#181828",               label: "Do not disturb",     sub: "Mute all notifications" },
  ];

  return (
    <div className="pp-slide" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <PanelHeader title="Notifications" onBack={onBack} />
      <div className="pp-scroll" style={scroll}>
        {items.map(item => (
          <Row
            key={item.key}
            icon={<Icon d={item.icon} size={15} />}
            iconColor={item.iconColor} iconBg={item.iconBg}
            label={item.label} sub={item.sub}
            right={<Toggle on={prefs[item.key]} onChange={() => toggle(item.key)} />}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PANEL
═══════════════════════════════════════════════════════════════════════════ */

export default function ProfilePanel({
  currUser,
  onBack,
  onLogout,
  onUpdateField,
  onUpdateAvatar,
  onChangePassword,
  onRefreshToken,
  onDeleteAccount,
}) {
  // sub: null | "profile" | "account" | "notifications"
  const [sub, setSub] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(currUser?.avatar ?? null);

  /* ── avatar change ───────────────────────────────────────────────────── */
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setAvatarUrl(localUrl);           // optimistic local preview
    await onUpdateAvatar?.(file);     // actual API call from parent
  };

  /* ── field save ──────────────────────────────────────────────────────── */
  const handleSaveField = (fieldKey, value) => {
    const map = { fullName: "fullName", username: "username", email: "email" };
    onUpdateField?.({ [map[fieldKey]]: value });
  };

  /* ── main menu items ─────────────────────────────────────────────────── */
  const mainItems = [
    { key: "profile",       icon: ICONS.profile, label: "Profile",       sub: "Name, photo, email" },
    { key: "account",       icon: ICONS.account, label: "Account",       sub: "Security & danger zone" },
    { key: "notifications", icon: ICONS.notif,   label: "Notifications", sub: "Alerts & sound",
      iconColor: "#EF9F27", iconBg: "rgba(239,159,39,0.12)" },
  ];

  /* ── render sub panels ───────────────────────────────────────────────── */
  if (sub === "profile") {
    return (
      <div style={panelWrap}>
        <style>{scrollCSS}</style>
        <ProfileSub
          currUser={currUser}
          avatarUrl={avatarUrl}
          onBack={() => setSub(null)}
          onAvatarChange={handleAvatarChange}
          onSaveField={handleSaveField}
        />
      </div>
    );
  }

  if (sub === "account") {
    return (
      <div style={panelWrap}>
        <style>{scrollCSS}</style>
        <AccountSub
          onBack={() => setSub(null)}
          onChangePassword={onChangePassword}
          onRefreshToken={onRefreshToken}
          onDeleteAccount={onDeleteAccount}
        />
      </div>
    );
  }

  if (sub === "notifications") {
    return (
      <div style={panelWrap}>
        <style>{scrollCSS}</style>
        <NotificationsSub onBack={() => setSub(null)} />
      </div>
    );
  }

  /* ── main panel ──────────────────────────────────────────────────────── */
  return (
    <div style={panelWrap}>
      <style>{scrollCSS}</style>

      {/* Header */}
      <div style={{
        height: 52, background: "#111120", borderBottom: "1px solid #1A1A2E",
        display: "flex", alignItems: "center", padding: "0 14px", gap: 10, flexShrink: 0,
      }}>
        <button
          onClick={onBack}
          aria-label="Back to contacts"
          style={{
            width: 28, height: 28, borderRadius: 8, background: "#181828",
            border: "1px solid #1A1A2E", display: "flex", alignItems: "center",
            justifyContent: "center", cursor: "pointer", color: "#8888AA",
            transition: "border-color .15s",
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "#7B6FFF"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "#1A1A2E"}
        >
          <Icon d={ICONS.back} size={14} />
        </button>
        <span style={{ fontSize: 14, fontWeight: 500, color: "#EEEEFF" }}>Settings</span>
      </div>

      <div className="pp-scroll" style={scroll}>

        {/* Avatar hero — small version on main */}
        <AvatarHero
          avatarUrl={avatarUrl}
          name={currUser?.fullName}
          username={currUser?.username}
          onAvatarChange={handleAvatarChange}
        />

        {/* Menu items */}
        <div style={{ paddingTop: 6 }}>
          {mainItems.map(item => (
            <Row
              key={item.key}
              icon={<Icon d={item.icon} size={15} />}
              iconColor={item.iconColor} iconBg={item.iconBg}
              label={item.label} sub={item.sub}
              onClick={() => setSub(item.key)}
              right={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="#2A2A42" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d={ICONS.chevron} />
                </svg>
              }
            />
          ))}

          {/* Logout */}
          <Row
            icon={<Icon d={ICONS.logout} size={15} />}
            iconColor="#EF4444" iconBg="rgba(239,68,68,0.1)"
            label="Log out"
            danger
            onClick={onLogout}
          />
        </div>

        <div style={{ padding: "18px 16px", textAlign: "center", fontSize: 11, color: "#2A2A42" }}>
          XChat v2.0
        </div>
      </div>
    </div>
  );
}

const panelWrap = {
  width: "100%", height: "100%",
  display: "flex", flexDirection: "column",
  background: "#0F0F18",
  fontFamily: '"Inter", system-ui, sans-serif',
  overflow: "hidden",
};

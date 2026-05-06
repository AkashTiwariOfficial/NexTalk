const STATUS_LABEL = { online: 'Online', away: 'Away', offline: 'Offline' }
const STATUS_COLOR = {
  online:  'var(--color-x-online)',
  away:    'var(--color-x-away)',
  offline: 'var(--color-x-offline)',
}

function ActionBtn({ label, children }) {
  return (
    <button
      aria-label={label}
      style={{
        width: 34, height: 34, borderRadius: 8,
        background: 'var(--color-x-surface3)',
        border: '1px solid var(--color-x-border)',
        color: 'var(--color-x-text2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'all 0.15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-x-accent)'; e.currentTarget.style.color = 'var(--color-x-accent)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-x-border)'; e.currentTarget.style.color = 'var(--color-x-text2)' }}
    >
      {children}
    </button>
  )
}

export default function ChatHeader({ contact }) {
  return (
    <div style={{
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      background: 'var(--color-x-surface)',
      borderBottom: '1px solid var(--color-x-border)',
      flexShrink: 0,
    }}>

      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: 'var(--color-x-accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, color: '#fff',
            boxShadow: '0 0 20px var(--color-x-accent-soft)',
          }}>
            {contact.initials}
          </div>
          <div style={{
            position: 'absolute', bottom: -1, right: -1,
            width: 11, height: 11, borderRadius: '50%',
            background: STATUS_COLOR[contact.status],
            border: '2px solid var(--color-x-surface)',
            boxShadow: contact.status === 'online' ? '0 0 8px #22C55E88' : 'none',
          }} />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-x-text)', letterSpacing: '-0.01em' }}>
            {contact.name}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: STATUS_COLOR[contact.status],
              display: 'inline-block',
            }} className={contact.status === 'online' ? 'anim-pulse' : ''} />
            <span style={{ fontSize: 11, color: 'var(--color-x-text2)' }}>
              {STATUS_LABEL[contact.status]}
            </span>
          </div>
        </div>
      </div>

      {/* Right actions */}
      <div style={{ display: 'flex', gap: 8 }}>
        <ActionBtn label="Search in chat">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/>
          </svg>
        </ActionBtn>
        <ActionBtn label="Call">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
        </ActionBtn>
        <ActionBtn label="Video">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
          </svg>
        </ActionBtn>
        <ActionBtn label="More">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>
          </svg>
        </ActionBtn>
      </div>
    </div>
  )
}
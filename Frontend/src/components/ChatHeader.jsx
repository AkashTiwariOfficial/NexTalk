import Avatar from './Avatar'

const STATUS = { online: 'Online', away: 'Away', offline: 'Offline' }

function Btn({ label, children }) {
  return (
    <button
      aria-label={label} title={label}
      style={{
        width: 34, height: 34, borderRadius: 9,
        background: 'var(--color-x-s3)',
        border: '1px solid var(--color-x-b1)',
        color: 'var(--color-x-t2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'all 0.15s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'var(--color-x-accent)'
        e.currentTarget.style.borderColor = 'var(--color-x-accent)'
        e.currentTarget.style.color = '#fff'
        e.currentTarget.style.boxShadow = '0 4px 14px var(--color-x-glow)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'var(--color-x-s3)'
        e.currentTarget.style.borderColor = 'var(--color-x-b1)'
        e.currentTarget.style.color = 'var(--color-x-t2)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {children}
    </button>
  )
}

export default function ChatHeader({ contact }) {

  return (
    <div style={{
      height: 66,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 22px',
      background: 'var(--color-x-s1)',
      borderBottom: '1px solid var(--color-x-b1)',
      flexShrink: 0,
    }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
        <Avatar
          image={contact?.participants[0]?.avatar}
          size={42}
          radius={13}
          status={contact?.status}
          glow={true}
        />
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-x-t1)', letterSpacing: '-0.01em', lineHeight: 1 }}>
            {contact?.participants[0]?.fullName}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              fontSize: 11, color: 'var(--color-x-t2)',
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: contact?.status === 'online' ? 'var(--color-x-online)' : contact?.status === 'away' ? 'var(--color-x-away)' : 'var(--color-x-t4)',
                display: 'inline-block',
                animation: contact?.status === 'online' ? 'onlinePulse 2.5s infinite' : 'none',
              }} />
              {STATUS[contact?.status]}
            </span>
            <span style={{ color: 'var(--color-x-t4)', fontSize: 10 }}>·</span>
            <span style={{ fontSize: 11, color: 'var(--color-x-t3)', fontFamily: 'var(--font-mono)' }}>
              End-to-end encrypted
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <Btn label="Search in chat">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="22" y2="22" />
          </svg>
        </Btn>
        <Btn label="Voice call">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </Btn>
        <Btn label="Video call">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" />
          </svg>
        </Btn>
        <Btn label="More options">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" />
          </svg>
        </Btn>
      </div>
    </div>
  )
}
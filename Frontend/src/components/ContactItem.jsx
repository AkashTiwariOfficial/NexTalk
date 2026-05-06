const STATUS = {
  online:  { color: 'var(--color-x-online)',  glow: '0 0 6px #22C55E88' },
  away:    { color: 'var(--color-x-away)',    glow: 'none' },
  offline: { color: 'var(--color-x-offline)', glow: 'none' },
}

export default function ContactItem({ contact, isActive, highlight, onClick }) {
  const s = STATUS[contact.status] ?? STATUS.offline

  const highlightText = (text) => {
    if (!highlight) return text
    const re = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    return text.split(re).map((p, i) =>
      re.test(p)
        ? <mark key={i} style={{ background: 'var(--color-x-accent)', color: '#fff', borderRadius: 2, padding: '0 2px' }}>{p}</mark>
        : p
    )
  }

  return (
    <div
      onClick={onClick}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick()}
      tabIndex={0}
      role="option"
      aria-selected={isActive}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '11px 16px',
        cursor: 'pointer',
        background: isActive ? 'var(--color-x-surface3)' : 'transparent',
        borderLeft: isActive ? '2px solid var(--color-x-accent)' : '2px solid transparent',
        transition: 'all 0.15s',
        outline: 'none',
      }}
      onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--color-x-surface2)' }}
      onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
    >
      {/* Avatar */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{
          width: 40, height: 40,
          borderRadius: '12px',
          background: isActive ? 'var(--color-x-accent)' : 'var(--color-x-surface3)',
          color: isActive ? '#fff' : 'var(--color-x-accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          fontWeight: 500,
          border: `1px solid ${isActive ? 'var(--color-x-accent)' : 'var(--color-x-border2)'}`,
          boxShadow: isActive ? '0 0 16px var(--color-x-accent-soft)' : 'none',
          transition: 'all 0.15s',
        }}>
          {contact.initials}
        </div>
        {/* Status dot */}
        <div style={{
          position: 'absolute', bottom: -1, right: -1,
          width: 10, height: 10,
          borderRadius: '50%',
          background: s.color,
          border: '2px solid var(--color-x-surface)',
          boxShadow: s.glow,
        }} />
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            fontSize: 13, fontWeight: 500,
            color: isActive ? 'var(--color-x-text)' : 'var(--color-x-text)',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {contact.name}
          </span>
          <span style={{ fontSize: 10, color: 'var(--color-x-text3)', flexShrink: 0, marginLeft: 8 }}>
            {contact.time}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
          <span style={{
            fontSize: 11, color: 'var(--color-x-text2)',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {highlightText(contact.preview)}
          </span>
          {contact.unread > 0 && (
            <span style={{
              marginLeft: 6,
              minWidth: 18, height: 18,
              borderRadius: '50%',
              background: 'var(--color-x-accent)',
              color: '#fff',
              fontSize: 9, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {contact.unread}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
import { useState } from 'react'
import Avatar from './Avatar'

function highlight(text, query) {
  if (!query) return text
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  return text.split(re).map((p, i) =>
    re.test(p)
      ? <mark key={i} style={{ background:'var(--color-x-accent)', color:'#fff', borderRadius:3, padding:'0 2px' }}>{p}</mark>
      : p
  )
}

export default function ContactItem({ contact, isActive, searchQuery, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick()}
      tabIndex={0}
      role="option"
      aria-selected={isActive}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px 16px',
        cursor: 'pointer',
        background: isActive
          ? 'linear-gradient(90deg, var(--color-x-s4), var(--color-x-s3))'
          : hovered ? 'var(--color-x-s2)' : 'transparent',
        borderLeft: `2.5px solid ${isActive ? 'var(--color-x-accent)' : 'transparent'}`,
        transition: 'all 0.15s',
        outline: 'none',
        position: 'relative',
      }}
    >
      {/* Subtle active glow */}
      {isActive && (
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none',
          background: 'linear-gradient(90deg, var(--color-x-glow2), transparent)',
        }} />
      )}

      <Avatar
        initials={contact.initials}
        gradient={contact.gradient}
        size={42}
        radius={13}
        status={contact.status}
        glow={isActive}
      />

      <div style={{ flex:1, minWidth:0, position:'relative' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:6 }}>
          <span style={{
            fontSize: 13, fontWeight: isActive ? 600 : 500,
            color: isActive ? 'var(--color-x-t1)' : 'var(--color-x-t1)',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            letterSpacing: '-0.01em',
          }}>
            {contact.name}
          </span>
          <span style={{
            fontSize: 10, color: isActive ? 'var(--color-x-accent2)' : 'var(--color-x-t3)',
            whiteSpace: 'nowrap', flexShrink: 0,
            fontFamily: 'var(--font-mono)',
            transition: 'color 0.15s',
          }}>
            {contact.time}
          </span>
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop: 3, gap: 6 }}>
          <span style={{
            fontSize: 12, color: 'var(--color-x-t2)',
            whiteSpace: 'nowrap', overflow:'hidden', textOverflow:'ellipsis',
            lineHeight: 1.3,
          }}>
            {highlight(contact.preview, searchQuery)}
          </span>
          {contact.unread > 0 && (
            <span style={{
              minWidth: 18, height: 18, borderRadius: 99,
              background: 'var(--color-x-accent)',
              color: '#fff', fontSize: 10, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '0 5px', flexShrink: 0,
              boxShadow: '0 2px 8px var(--color-x-glow)',
            }}>
              {contact.unread}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
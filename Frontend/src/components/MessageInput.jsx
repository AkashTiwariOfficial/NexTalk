import { useState, useRef } from 'react'

function IconBtn({ label, onClick, children }) {
  return (
    <button
      aria-label={label} title={label} onClick={onClick}
      style={{
        width: 36, height: 36, borderRadius: 10,
        background: 'var(--color-x-s3)',
        border: '1px solid var(--color-x-b1)',
        color: 'var(--color-x-t3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', flexShrink: 0, transition: 'all 0.15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-x-accent)'; e.currentTarget.style.borderColor = 'var(--color-x-b3)' }}
      onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-x-t3)'; e.currentTarget.style.borderColor = 'var(--color-x-b1)' }}
    >
      {children}
    </button>
  )
}

export default function MessageInput({ reciver, onSend }) {
  const [text, setText] = useState('')
  const [focused, setFocused] = useState(false)
  const ref = useRef(null)
  const canSend = text.trim().length > 0

  const send = () => {
    if (!canSend) return
    onSend(text.trim(), reciver)
    setText('')
    ref.current?.focus()
  }

  return (
    <div style={{
      padding: '14px 18px',
      borderTop: '1px solid var(--color-x-b1)',
      background: 'linear-gradient(0deg, var(--color-x-s2) 0%, var(--color-x-s1) 100%)',
      display: 'flex', alignItems: 'center', gap: 10,
      flexShrink: 0,
    }}>

      <IconBtn label="Attach file">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
        </svg>
      </IconBtn>

      {/* Main input */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', gap: 8,
        height: 42, borderRadius: 13,
        background: 'var(--color-x-s3)',
        border: `1px solid ${focused ? 'var(--color-x-accent)' : 'var(--color-x-b2)'}`,
        boxShadow: focused ? '0 0 0 3px var(--color-x-glow2)' : '0 1px 3px rgba(0,0,0,0.2)',
        padding: '0 14px',
        transition: 'all 0.18s',
      }}>
        <input
          ref={ref}
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Type a message..."
          autoComplete="off"
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: 'var(--color-x-t1)', fontSize: 13.5,
            fontFamily: 'var(--font-sans)', minWidth: 0,
          }}
        />
        {/* Emoji button inside input */}
        <button
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 17, lineHeight: 1, flexShrink: 0,
            opacity: 0.5, transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '1'}
          onMouseLeave={e => e.currentTarget.style.opacity = '0.5'}
        >
          😊
        </button>
      </div>

      {/* Send button */}
      <button
        onClick={send}
        aria-label="Send message"
        style={{
          width: 42, height: 42, borderRadius: 13,
          background: canSend
            ? 'linear-gradient(135deg, var(--color-x-accent), var(--color-x-accent3))'
            : 'var(--color-x-s4)',
          border: `1px solid ${canSend ? 'transparent' : 'var(--color-x-b1)'}`,
          color: canSend ? '#fff' : 'var(--color-x-t4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: canSend ? 'pointer' : 'default',
          flexShrink: 0,
          boxShadow: canSend ? '0 4px 16px var(--color-x-glow)' : 'none',
          transform: canSend ? 'scale(1)' : 'scale(0.95)',
          transition: 'all 0.2s cubic-bezier(.16,1,.3,1)',
        }}
        onMouseEnter={e => canSend && (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={e => e.currentTarget.style.transform = canSend ? 'scale(1)' : 'scale(0.95)'}
        onMouseDown={e => canSend && (e.currentTarget.style.transform = 'scale(0.94)')}
        onMouseUp={e => canSend && (e.currentTarget.style.transform = 'scale(1)')}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"/>
          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      </button>
    </div>
  )
}
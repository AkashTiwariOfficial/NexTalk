import { useState, useRef } from 'react'

export default function MessageInput({ onSend }) {
  const [text, setText] = useState('')
  const ref = useRef(null)

  const send = () => {
    if (!text.trim()) return
    onSend(text.trim())
    setText('')
    ref.current?.focus()
  }

  return (
    <div style={{
      padding: '12px 16px',
      background: 'var(--color-x-surface)',
      borderTop: '1px solid var(--color-x-border)',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flexShrink: 0,
    }}>

      {/* Attach */}
      <button
        aria-label="Attach"
        style={{
          width: 38, height: 38, borderRadius: 10,
          background: 'var(--color-x-surface3)',
          border: '1px solid var(--color-x-border)',
          color: 'var(--color-x-text3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', flexShrink: 0, transition: 'all 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-x-accent)'; e.currentTarget.style.borderColor = 'var(--color-x-accent)' }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-x-text3)'; e.currentTarget.style.borderColor = 'var(--color-x-border)' }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
        </svg>
      </button>

      {/* Emoji */}
      <button
        aria-label="Emoji"
        style={{
          width: 38, height: 38, borderRadius: 10,
          background: 'var(--color-x-surface3)',
          border: '1px solid var(--color-x-border)',
          color: 'var(--color-x-text3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', flexShrink: 0, fontSize: 16, transition: 'all 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-x-accent)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-x-border)'}
      >
        😊
      </button>

      {/* Input field */}
      <input
        ref={ref}
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && send()}
        placeholder="Type a message..."
        autoComplete="off"
        style={{
          flex: 1,
          height: 38,
          background: 'var(--color-x-surface3)',
          border: '1px solid var(--color-x-border)',
          borderRadius: 10,
          color: 'var(--color-x-text)',
          fontSize: 13,
          padding: '0 14px',
          outline: 'none',
          transition: 'border-color 0.15s, box-shadow 0.15s',
          fontFamily: 'var(--font-sans)',
        }}
        onFocus={e => {
          e.target.style.borderColor = 'var(--color-x-accent)'
          e.target.style.boxShadow = '0 0 0 3px var(--color-x-accent-soft)'
        }}
        onBlur={e => {
          e.target.style.borderColor = 'var(--color-x-border)'
          e.target.style.boxShadow = 'none'
        }}
      />

      {/* Send */}
      <button
        onClick={send}
        aria-label="Send"
        style={{
          height: 38,
          padding: '0 20px',
          borderRadius: 10,
          background: text.trim() ? 'var(--color-x-accent)' : 'var(--color-x-surface3)',
          border: `1px solid ${text.trim() ? 'var(--color-x-accent)' : 'var(--color-x-border)'}`,
          color: text.trim() ? '#fff' : 'var(--color-x-text3)',
          fontSize: 13, fontWeight: 600,
          display: 'flex', alignItems: 'center', gap: 7,
          cursor: text.trim() ? 'pointer' : 'default',
          flexShrink: 0,
          transition: 'all 0.2s',
          boxShadow: text.trim() ? '0 4px 16px var(--color-x-accent-soft)' : 'none',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"/>
          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
        Send
      </button>
    </div>
  )
}
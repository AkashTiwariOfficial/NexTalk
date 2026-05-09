import { useState, useRef } from 'react'

export default function SearchBar({ label, placeholder, value, onChange, accentTag = false }) {
  const [focused, setFocused] = useState(false)
  const ref = useRef(null)

  return (
    <div
      onClick={() => ref.current?.focus()}
      style={{
        display: 'flex', alignItems: 'center',
        height: 38, borderRadius: 10,
        background: 'var(--color-x-s3)',
        border: `1px solid ${focused ? 'var(--color-x-accent)' : 'var(--color-x-b1)'}`,
        boxShadow: focused ? '0 0 0 3px var(--color-x-glow2)' : 'none',
        transition: 'all 0.15s',
        cursor: 'text', overflow: 'hidden',
      }}
    >
      {/* Label tag */}
      <span style={{
        padding: '0 10px',
        height: '100%',
        display: 'flex', alignItems: 'center',
        borderRight: `1px solid ${focused ? 'var(--color-x-b2)' : 'var(--color-x-b1)'}`,
        fontFamily: 'var(--font-mono)',
        fontSize: 9, fontWeight: 500, letterSpacing: '0.14em',
        color: accentTag ? 'var(--color-x-accent)' : 'var(--color-x-t3)',
        whiteSpace: 'nowrap', flexShrink: 0, userSelect: 'none',
        transition: 'color 0.15s',
      }}>
        {label}
      </span>

      {/* Icon */}
      <span style={{
        paddingLeft: 10, flexShrink: 0,
        color: focused ? 'var(--color-x-accent)' : 'var(--color-x-t3)',
        display: 'flex', alignItems: 'center',
        transition: 'color 0.15s',
      }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="11" cy="11" r="7"/>
          <line x1="16.5" y1="16.5" x2="22" y2="22"/>
        </svg>
      </span>

      {/* Input */}
      <input
        ref={ref}
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={e => e.key === 'Escape' && onChange('')}
        placeholder={placeholder}
        autoComplete="off" spellCheck={false}
        style={{
          flex: 1, background: 'transparent', border: 'none', outline: 'none',
          color: 'var(--color-x-t1)', fontSize: 12,
          padding: '0 8px', minWidth: 0,
          fontFamily: 'var(--font-sans)',
        }}
      />

      {/* Clear */}
      {value && (
        <button
          onMouseDown={e => { e.preventDefault(); onChange('') }}
          style={{
            width: 17, height: 17, borderRadius: '50%',
            background: 'var(--color-x-b2)', border: 'none',
            color: 'var(--color-x-t2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', marginRight: 8, flexShrink: 0,
            fontSize: 9, fontWeight: 700,
          }}
        >✕</button>
      )}
    </div>
  )
}
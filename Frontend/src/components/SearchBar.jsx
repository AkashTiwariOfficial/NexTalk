export default function SearchBar({ label, placeholder, value, onChange, color = 'accent' }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        background: 'var(--color-x-surface3)',
        border: '1px solid var(--color-x-border)',
        borderRadius: '8px',
        height: '36px',
        transition: 'border-color 0.15s',
      }}
      onFocus={e => e.currentTarget.style.borderColor = 'var(--color-x-accent)'}
      onBlur={e => e.currentTarget.style.borderColor = 'var(--color-x-border)'}
    >
      {/* Tag */}
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '9px',
        letterSpacing: '0.12em',
        color: color === 'accent' ? 'var(--color-x-accent)' : 'var(--color-x-text2)',
        padding: '0 10px',
        borderRight: '1px solid var(--color-x-border)',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        userSelect: 'none',
      }}>
        {label}
      </span>

      {/* Input */}
      <input
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => e.key === 'Escape' && onChange('')}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          color: 'var(--color-x-text)',
          fontFamily: 'var(--font-sans)',
          fontSize: '12px',
          padding: '0 10px',
          minWidth: 0,
        }}
      />

      {/* Icon */}
      <button
        onClick={() => onChange(value)}
        style={{
          width: 36,
          height: '100%',
          background: 'transparent',
          border: 'none',
          borderLeft: '1px solid var(--color-x-border)',
          color: 'var(--color-x-text3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          flexShrink: 0,
          transition: 'color 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--color-x-accent)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--color-x-text3)'}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="22" y2="22" />
        </svg>
      </button>
    </div>
  )
}
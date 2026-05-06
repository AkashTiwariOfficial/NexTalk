export default function TypingIndicator({ initials }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: 28, height: 28, borderRadius: 8,
        background: 'var(--color-x-surface3)',
        border: '1px solid var(--color-x-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-x-accent)',
        flexShrink: 0,
      }}>
        {initials}
      </div>
      <div style={{
        display: 'flex',
        gap: 5,
        padding: '10px 14px',
        borderRadius: '4px 16px 16px 16px',
        background: 'var(--color-x-surface3)',
        border: '1px solid var(--color-x-border)',
      }}>
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className={`anim-blink ${i === 1 ? 'delay-1' : i === 2 ? 'delay-2' : ''}`}
            style={{
              width: 6, height: 6, borderRadius: '50%',
              background: 'var(--color-x-accent)',
              display: 'inline-block',
            }}
          />
        ))}
      </div>
    </div>
  )
}
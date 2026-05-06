export default function MessageBubble({ from, text, time }) {
  const isSent = from === 'sent'

  return (
    <div
      className="anim-fade-up"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isSent ? 'flex-end' : 'flex-start',
        gap: 4,
      }}
    >
      <div style={{
        maxWidth: '68%',
        padding: '10px 14px',
        borderRadius: isSent ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
        background: isSent
          ? 'var(--color-x-accent)'
          : 'var(--color-x-surface3)',
        color: isSent ? '#fff' : 'var(--color-x-recv-text)',
        fontSize: 13,
        lineHeight: 1.55,
        fontWeight: 400,
        border: isSent
          ? 'none'
          : '1px solid var(--color-x-border)',
        boxShadow: isSent
          ? '0 4px 20px var(--color-x-accent-soft)'
          : 'none',
        wordBreak: 'break-word',
      }}>
        {text}
      </div>
      <span style={{
        fontSize: 10,
        color: 'var(--color-x-text3)',
        padding: '0 4px',
      }}>
        {time}
      </span>
    </div>
  )
}
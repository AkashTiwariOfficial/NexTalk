export default function MessageBubble({ from, text, time }) {
  const isSent = from === 'sent'


  return (
    <div
      className="anim-up"
      style={{
        display: 'flex',
        justifyContent: isSent ? 'flex-end' : 'flex-start',
      }}
    >
      <div style={{ maxWidth: '68%', display: 'flex', flexDirection: 'column', alignItems: isSent ? 'flex-end' : 'flex-start', gap: 4 }}>

        {/* Bubble */}
        <div style={{
          padding: '10px 15px',
          borderRadius: isSent ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
          background: isSent
            ? 'linear-gradient(135deg, var(--color-x-accent), var(--color-x-accent3))'
            : 'var(--color-x-s3)',
          color: isSent ? '#fff' : 'var(--color-x-t1)',
          fontSize: 13.5,
          lineHeight: 1.55,
          fontWeight: 400,
          border: isSent ? 'none' : '1px solid var(--color-x-b2)',
          boxShadow: isSent
            ? '0 4px 20px var(--color-x-glow), inset 0 1px 0 rgba(255,255,255,0.15)'
            : '0 1px 3px rgba(0,0,0,0.2)',
          wordBreak: 'break-word',
          letterSpacing: '-0.01em',
          position: 'relative',
        }}>
          {text}
        </div>

        {/* Meta row */}
        <div style={{ display:'flex', alignItems:'center', gap: 5, padding: '0 4px' }}>
          <span style={{
            fontSize: 10.5, color: 'var(--color-x-t3)',
            fontFamily: 'var(--font-mono)',
          }}>
            {time}
          </span>
          {/* Read ticks for sent */}
          {isSent && (
            <svg width="15" height="10" viewBox="0 0 15 10" fill="none">
              <path d="M1 5l3 3L10 1" stroke="var(--color-x-accent2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 5l3 3 6-7" stroke="var(--color-x-accent2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
      </div>
    </div>
  )
}
import Avatar from './Avatar'

export default function TypingIndicator({ contact }) {
  return (
    <div style={{ display:'flex', alignItems:'flex-end', gap: 8 }}>
      <Avatar  image={contact?.participants[0]?.avatar} size={28} radius={9} />
      <div style={{
        padding: '10px 16px',
        borderRadius: '4px 18px 18px 18px',
        background: 'var(--color-x-s3)',
        border: '1px solid var(--color-x-b2)',
        display: 'flex', alignItems: 'center', gap: 5,
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }}>
        {[0,1,2].map(i => (
          <span key={i} className={`anim-blink ${i===1?'d1':i===2?'d2':''}`} style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--color-x-accent2)',
            display: 'inline-block',
          }} />
        ))}
      </div>
    </div>
  )
}
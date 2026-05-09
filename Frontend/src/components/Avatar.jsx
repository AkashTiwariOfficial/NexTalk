const STATUS_COLOR = {
  online:  '#34D399',
  away:    '#FBBF24',
  offline: 'var(--color-x-offline)',
}

export default function Avatar({ initials, gradient, size = 40, status = null, radius = 12, glow = false }) {
  return (
    <div style={{ position:'relative', width:size, height:size, flexShrink:0 }}>
      <div style={{
        width:size, height:size,
        borderRadius: radius,
        background: gradient ?? 'var(--color-x-s4)',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontFamily: 'var(--font-mono)',
        fontSize: Math.round(size * 0.29),
        fontWeight: 500,
        color: '#fff',
        letterSpacing: '0.04em',
        boxShadow: glow
          ? `0 0 0 2px var(--color-x-bg), 0 0 0 3.5px var(--color-x-accent), 0 8px 24px var(--color-x-glow)`
          : `inset 0 1px 0 rgba(255,255,255,0.12), 0 1px 3px rgba(0,0,0,0.4)`,
        userSelect: 'none',
        transition: 'box-shadow 0.2s',
      }}>
        {initials}
      </div>

      {status && (
        <div style={{
          position: 'absolute',
          bottom: -1, right: -1,
          width: Math.round(size * 0.27),
          height: Math.round(size * 0.27),
          borderRadius: '50%',
          background: STATUS_COLOR[status],
          border: `2px solid var(--color-x-bg)`,
          animation: status === 'online' ? 'onlinePulse 2.5s infinite' : 'none',
        }} />
      )}
    </div>
  )
}
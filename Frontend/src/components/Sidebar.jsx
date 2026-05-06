import SearchBar   from './SearchBar'
import ContactItem  from './ContactItem'

export default function Sidebar({ contacts, activeId, chatSearch, setChatSearch, globalSearch, setGlobalSearch, onSelect }) {
  return (
    <div style={{
      width: 280,
      minWidth: 280,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--color-x-surface)',
      borderRight: '1px solid var(--color-x-border)',
    }}>

      {/* ── Header ──────────────────────────────── */}
      <div style={{
        padding: '20px 16px 16px',
        borderBottom: '1px solid var(--color-x-border)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 10,
              background: 'var(--color-x-accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 16px var(--color-x-accent-soft)',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-x-text)', letterSpacing: '-0.02em' }}>
                XChat
              </div>
              <div style={{ fontSize: 10, color: 'var(--color-x-text3)', marginTop: 1 }}>
                4 online
              </div>
            </div>
          </div>
          {/* New chat button */}
          <button style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'var(--color-x-surface3)',
            border: '1px solid var(--color-x-border)',
            color: 'var(--color-x-text2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-x-accent)'; e.currentTarget.style.color = 'var(--color-x-accent)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-x-border)'; e.currentTarget.style.color = 'var(--color-x-text2)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>

        {/* Dual search bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <SearchBar
            label="CHATS"
            placeholder="Filter conversations..."
            value={chatSearch}
            onChange={setChatSearch}
            color="accent"
          />
          <SearchBar
            label="GLOBAL"
            placeholder="Search messages..."
            value={globalSearch}
            onChange={setGlobalSearch}
            color="muted"
          />
        </div>
      </div>

      {/* ── Section label ────────────────────────── */}
      <div style={{
        padding: '12px 16px 6px',
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.08em',
        color: 'var(--color-x-text3)',
        textTransform: 'uppercase',
        flexShrink: 0,
      }}>
        Messages
      </div>

      {/* ── Contact list ─────────────────────────── */}
      <div className="scroll" style={{ flex: 1, overflowY: 'auto', minHeight: 0 }} role="listbox">
        {contacts.length === 0 && (
          <div style={{ padding: 20, textAlign: 'center', color: 'var(--color-x-text3)', fontSize: 12 }}>
            No results
          </div>
        )}
        {contacts.map(c => (
          <ContactItem
            key={c.id}
            contact={c}
            isActive={c.id === activeId}
            highlight={globalSearch}
            onClick={() => onSelect(c.id)}
          />
        ))}
      </div>

      {/* ── Footer / User ────────────────────────── */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid var(--color-x-border)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        flexShrink: 0,
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: 'linear-gradient(135deg, #6C63FF, #A855F7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 600, color: '#fff',
          flexShrink: 0,
        }}>
          ME
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-x-text)' }}>You</div>
          <div style={{ fontSize: 10, color: 'var(--color-x-online)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span className="anim-pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-x-online)', display: 'inline-block' }}/>
            Active now
          </div>
        </div>
        <button style={{
          width: 28, height: 28, borderRadius: 6,
          background: 'transparent',
          border: '1px solid var(--color-x-border)',
          color: 'var(--color-x-text3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
import SearchBar    from './SearchBar'
import ContactItem  from './ContactItem'
import Avatar       from './Avatar'
import { useChatContext } from '../hookes/context/useChatContext.jsx';
import { useGetMessages } from '../hookes/ApiCalls/useGetMessages.jsx';
import { useCallback } from 'react';

export default function Sidebar({ contacts, activeId, chatSearch, setChatSearch, globalSearch, setGlobalSearch, onSelect }) {


    const { currentUser } = useChatContext();
    const { fetchMessages } = useGetMessages();

 const getAllMessages = useCallback(async (id) => {
  await fetchMessages(id);
}, [activeId]);

  const totalUnread = contacts.reduce((a, c) => a + (c.unread || 0), 0);

  return (
    <div style={{
      width: 300, minWidth: 300, height: '100%',
      display: 'flex', flexDirection: 'column',
      background: 'var(--color-x-s1)',
      borderRight: '1px solid var(--color-x-b1)',
    }}>

      {/* ── Header ─────────────────────────────────── */}
      <div style={{
        padding: '18px 16px 14px',
        borderBottom: '1px solid var(--color-x-b1)',
        flexShrink: 0,
        background: 'linear-gradient(180deg, var(--color-x-s2), var(--color-x-s1))',
      }}>

        {/* Brand row */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 16 }}>
          <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
            {/* Logo */}
            <div style={{
              width: 36, height: 36, borderRadius: 11,
              background: 'linear-gradient(135deg, var(--color-x-accent), #A855F7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px var(--color-x-glow), inset 0 1px 0 rgba(255,255,255,0.2)',
              flexShrink: 0,
            }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-x-t1)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                XChat
              </div>
              <div style={{ fontSize: 11, color: 'var(--color-x-t3)', marginTop: 2 }}>
                {totalUnread > 0 ? `${totalUnread} unread` : 'All caught up ✓'}
              </div>
            </div>
          </div>

          {/* New chat */}
          <button
            title="New conversation"
            style={{
              width: 32, height: 32, borderRadius: 9,
              background: 'var(--color-x-s4)',
              border: '1px solid var(--color-x-b2)',
              color: 'var(--color-x-t2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--color-x-accent)'
              e.currentTarget.style.borderColor = 'var(--color-x-accent)'
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.boxShadow = '0 4px 12px var(--color-x-glow)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--color-x-s4)'
              e.currentTarget.style.borderColor = 'var(--color-x-b2)'
              e.currentTarget.style.color = 'var(--color-x-t2)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>

        {/* Dual search bars */}
        <div style={{ display:'flex', flexDirection:'column', gap: 8 }}>
          <SearchBar
            label="CHATS"
            placeholder="Filter conversations..."
            value={chatSearch}
            onChange={setChatSearch}
            accentTag={true}
          />
          <SearchBar
            label="GLOBAL"
            placeholder="Search everything..."
            value={globalSearch}
            onChange={setGlobalSearch}
            accentTag={false}
          />
        </div>
      </div>

      {/* ── Section label ───────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px 6px',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', color: 'var(--color-x-t3)', textTransform: 'uppercase' }}>
          Messages
        </span>
        <span style={{
          fontSize: 10, color: 'var(--color-x-t3)',
          background: 'var(--color-x-s3)',
          border: '1px solid var(--color-x-b1)',
          borderRadius: 99, padding: '1px 7px',
        }}>
          {contacts.length}
        </span>
      </div>

      {/* ── Contact list ─────────────────────────────── */}
      <div className="scroll" style={{ flex:1, overflowY:'auto', minHeight:0 }} role="listbox">
        {contacts.length === 0 && (
          <div style={{ padding:'32px 16px', textAlign:'center' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🔍</div>
            <div style={{ fontSize: 12, color: 'var(--color-x-t3)' }}>No results found</div>
          </div>
        )}
        {contacts.map(c => (
          <ContactItem
            key={c._id}
            contact={c}
            isActive={c._id === activeId}
            searchQuery={globalSearch}
            onClick={() => {onSelect(c._id); getAllMessages(c._id);}}
            
          />
        ))}
      </div>

      {/* ── User footer ──────────────────────────────── */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid var(--color-x-b1)',
        display: 'flex', alignItems: 'center', gap: 10,
        flexShrink: 0,
        background: 'linear-gradient(0deg, var(--color-x-s2), transparent)',
      }}>
        <Avatar
          image={currentUser?.avatar}
          gradient="linear-gradient(135deg,#7B6FFF,#A855F7)"
          size={34}
          radius={10}
          status="online"
        />
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-x-t1)', letterSpacing: '-0.01em' }}>You</div>
          <div style={{ display:'flex', alignItems:'center', gap: 5, marginTop: 1 }}>
            <div style={{ width:5, height:5, borderRadius:'50%', background:'var(--color-x-online)', flexShrink:0 }} className="anim-pulse" />
            <span style={{ fontSize: 11, color: 'var(--color-x-online)' }}>Active now</span>
          </div>
        </div>
        <button style={{
          width: 28, height: 28, borderRadius: 8,
          background: 'transparent', border: '1px solid var(--color-x-b1)',
          color: 'var(--color-x-t3)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-x-t1)'; e.currentTarget.style.borderColor = 'var(--color-x-b3)' }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-x-t3)'; e.currentTarget.style.borderColor = 'var(--color-x-b1)' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
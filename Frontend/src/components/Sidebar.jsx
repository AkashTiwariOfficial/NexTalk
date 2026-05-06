/**
 * components/Sidebar.jsx
 * Left panel:
 *   - Brand header
 *   - Dual search bars (Chat search + Global search)
 *   - Scrollable contact list
 *
 * Props:
 *   contacts      Contact[]
 *   activeId      string
 *   onSelect      (id: string) => void
 */
import { useState } from 'react'
import SearchBar    from './SearchBar'
import ContactItem  from './ContactItem'

export default function Sidebar({ contacts, activeId, onSelect }) {
  const [chatFilter,   setChatFilter]   = useState('')
  const [globalFilter, setGlobalFilter] = useState('')

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(chatFilter.toLowerCase())
  )

  return (
    <aside className="w-[240px] min-w-[240px] flex flex-col bg-gc-sidebar border-r border-gc-borderStrong">

      {/* ── Header ──────────────────────────────────────── */}
      <div className="flex items-center justify-between px-[13px] py-[14px]
                      bg-gc-sidebarHead border-b border-gc-borderStrong flex-shrink-0">
        <div className="flex items-center gap-[9px]">
          {/* Brand icon */}
          <div className="w-[32px] h-[32px] border border-gc-accent flex items-center
                          justify-center text-gc-accent flex-shrink-0
                          shadow-accent-glow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <div>
            <div className="font-display text-[16px] tracking-[0.08em] text-gc-accent
                            [text-shadow:0_0_14px_rgba(57,255,106,0.4)] leading-none">
              GreenChat
            </div>
            <div className="font-display text-[8px] tracking-[0.12em] text-gc-textMuted
                            uppercase mt-[2px]">
              v2.0 — forest build
            </div>
          </div>
        </div>

        {/* Live badge */}
        <span className="font-display text-[8px] tracking-[0.2em] text-gc-accent
                         border border-gc-accent px-[6px] py-[2px] animate-blink-border">
          LIVE
        </span>
      </div>

      {/* ── Dual Search Bars ─────────────────────────────── */}
      <div className="flex flex-col gap-[6px] px-[11px] py-[9px]
                      bg-gc-sidebar border-b border-gc-borderStrong flex-shrink-0">
        {/* Bar 1 — Chat search: filters sidebar contacts */}
        <SearchBar
          type="chat"
          label="CHATS"
          placeholder="Filter conversations..."
          value={chatFilter}
          onChange={setChatFilter}
        />

        {/* Bar 2 — Global search: highlights previews */}
        <SearchBar
          type="global"
          label="GLOBAL"
          placeholder="Search messages, files..."
          value={globalFilter}
          onChange={setGlobalFilter}
        />
      </div>

      {/* ── Section label ────────────────────────────────── */}
      <div className="font-display text-[7.5px] tracking-[0.2em] text-gc-textMuted
                      uppercase px-3 py-[7px] border-b border-gc-borderMid flex-shrink-0">
        // CONVERSATIONS
      </div>

      {/* ── Contact List ─────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto scrollbar-gc" role="listbox" aria-label="Conversations">
        {filtered.length === 0 && (
          <p className="font-display text-[9px] text-gc-textMuted tracking-widest
                        text-center pt-6 uppercase">
            No results
          </p>
        )}
        {filtered.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            isActive={contact.id === activeId}
            highlight={globalFilter}
            onClick={() => onSelect(contact.id)}
          />
        ))}
      </div>
    </aside>
  )
}

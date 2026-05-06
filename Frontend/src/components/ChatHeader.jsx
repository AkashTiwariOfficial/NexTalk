/**
 * components/ChatHeader.jsx
 * Top bar of the chat window.
 *
 * Props:
 *   contact  { initials, name, status }
 */
const STATUS_LABEL = { online: 'Online', away: 'Away', offline: 'Offline' }
const DOT_CLASS = {
  online:  'bg-gc-online shadow-[0_0_8px_rgba(57,255,106,0.5)]',
  away:    'bg-gc-away',
  offline: 'bg-gc-offline',
}

export default function ChatHeader({ contact }) {
  return (
    <div className="flex items-center justify-between px-[17px] py-[11px]
                    bg-gc-chatHead border-b border-gc-borderStrong flex-shrink-0">

      {/* Left: avatar + info */}
      <div className="flex items-center gap-[11px]">
        <div className="relative">
          <div className="w-[37px] h-[37px] bg-gc-monoActiveBg text-gc-monoActiveText
                          flex items-center justify-center font-display text-[14px]
                          border border-gc-accent shadow-accent-glow">
            {contact.initials}
          </div>
          <span
            className={`absolute -bottom-[2px] -right-[2px] w-[9px] h-[9px] rounded-full
                        border-[1.5px] border-gc-chatHead ${DOT_CLASS[contact.status]}`}
            aria-label={STATUS_LABEL[contact.status]}
          />
        </div>

        <div>
          <div className="font-display text-[15px] tracking-[0.06em] text-gc-textPrimary leading-none">
            {contact.name}
          </div>
          <div className="flex items-center gap-[5px] mt-[3px]">
            <span className="w-[5px] h-[5px] bg-gc-accent rounded-full
                             shadow-[0_0_6px_rgba(57,255,106,0.5)] animate-pulse-dot" />
            <span className="font-display text-[8.5px] tracking-[0.12em] uppercase
                             text-gc-textSecondary">
              {STATUS_LABEL[contact.status]}
            </span>
          </div>
        </div>
      </div>

      {/* Right: action buttons */}
      <div className="flex gap-[5px]" role="toolbar" aria-label="Chat actions">
        {[
          { label: 'Search in chat', icon: (
            <><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/></>
          )},
          { label: 'Start call', icon: (
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 5.6 5.6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          )},
          { label: 'More options', icon: (
            <><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></>
          )},
        ].map(({ label, icon }) => (
          <button
            key={label}
            aria-label={label}
            className="w-[29px] h-[29px] border border-gc-borderStrong bg-transparent
                       text-gc-textSecondary flex items-center justify-center
                       hover:border-gc-accent hover:text-gc-accent
                       hover:shadow-[0_0_10px_rgba(57,255,106,0.25)]
                       transition-all duration-150 cursor-pointer"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {icon}
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}

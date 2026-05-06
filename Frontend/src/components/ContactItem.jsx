/**
 * components/ContactItem.jsx
 * Single row in the contact list.
 *
 * Props:
 *   contact   Contact object
 *   isActive  boolean
 *   highlight string — global search term to highlight in preview
 *   onClick   () => void
 */
function StatusDot({ status }) {
  const colors = {
    online:  'bg-gc-online shadow-[0_0_6px_rgba(57,255,106,0.5)]',
    away:    'bg-gc-away',
    offline: 'bg-gc-offline',
  }
  return (
    <span
      className={`absolute -bottom-0.5 -right-0.5 w-[8px] h-[8px] rounded-full
                  border-[1.5px] border-gc-sidebar ${colors[status] ?? colors.offline}`}
      aria-label={status}
    />
  )
}

function HighlightedText({ text, highlight }) {
  if (!highlight) return <span>{text}</span>
  const re  = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(re)
  return (
    <span>
      {parts.map((part, i) =>
        re.test(part)
          ? <mark key={i} className="bg-gc-accent text-gc-textOnAccent px-px">{part}</mark>
          : part
      )}
    </span>
  )
}

export default function ContactItem({ contact, isActive, highlight, onClick }) {
  return (
    <div
      role="option"
      aria-selected={isActive}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
      className={`flex items-center gap-[9px] px-3 py-[9px] border-b border-gc-borderMid
                  cursor-pointer transition-colors duration-100 outline-none
                  focus-visible:border-gc-accent
                  ${isActive
                    ? 'bg-gc-contactActiveBg border-l-[3px] border-l-gc-contactActiveBar shadow-[inset_3px_0_12px_rgba(57,255,106,0.12)]'
                    : 'hover:bg-gc-contactHover'
                  }`}
    >
      {/* Avatar + status dot */}
      <div className="relative flex-shrink-0">
        <div
          className={`w-[33px] h-[33px] flex items-center justify-center
                      font-display text-[12px] border border-gc-borderStrong
                      ${isActive
                        ? 'bg-gc-monoActiveBg text-gc-monoActiveText shadow-accent-glow'
                        : 'bg-gc-monoBg text-gc-monoText'
                      }`}
        >
          {contact.initials}
        </div>
        <StatusDot status={contact.status} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline gap-1">
          <span className={`font-body text-[11px] font-medium truncate
                            ${isActive ? 'text-gc-accent' : 'text-gc-textPrimary'}`}>
            {contact.name}
          </span>
          <span className="font-display text-[7.5px] text-gc-textMuted whitespace-nowrap flex-shrink-0">
            {contact.time}
          </span>
        </div>
        <div className="flex justify-between items-center mt-0.5">
          <span className="font-body text-[9px] text-gc-textSecondary truncate">
            <HighlightedText text={contact.preview} highlight={highlight} />
          </span>
          {contact.unread > 0 && (
            <span className="ml-1 min-w-[16px] h-[16px] bg-gc-badgeBg text-gc-badgeText
                             font-display text-[7.5px] flex items-center justify-center
                             px-[3px] rounded-sm flex-shrink-0"
                  aria-label={`${contact.unread} unread`}>
              {contact.unread}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

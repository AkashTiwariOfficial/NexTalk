/**
 * components/SearchBar.jsx
 * Reusable search bar used TWICE in the sidebar:
 *   type="chat"   → filters the conversation list
 *   type="global" → searches across all messages & files
 *
 * Props:
 *   type        "chat" | "global"
 *   label       Tag label e.g. "CHATS"
 *   placeholder Input placeholder
 *   value       Controlled value
 *   onChange    (value: string) => void
 */
export default function SearchBar({ type, label, placeholder, value, onChange }) {
  const isChat = type === 'chat'

  const tagClass = isChat
    ? 'bg-gc-chatTagBg text-gc-chatTagText'
    : 'bg-gc-globalTagBg text-gc-globalTagText'

  return (
    <div
      className="flex items-center h-[30px] border border-gc-borderStrong bg-gc-input
                 focus-within:border-gc-accent focus-within:shadow-[0_0_0_1px_rgba(57,255,106,0.18)]
                 transition-all duration-150"
      role="search"
      aria-label={`${label} search`}
    >
      {/* Tag */}
      <span
        className={`${tagClass} font-display text-[8px] tracking-[0.18em] uppercase
                    px-[8px] h-full flex items-center border-r border-gc-borderStrong
                    whitespace-nowrap flex-shrink-0 select-none`}
        aria-hidden="true"
      >
        {label}
      </span>

      {/* Input */}
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Escape' && onChange('')}
        placeholder={placeholder}
        aria-label={placeholder}
        autoComplete="off"
        spellCheck={false}
        className="flex-1 bg-transparent border-none outline-none font-body text-[10px]
                   text-gc-textPrimary placeholder:text-gc-textMuted px-2 min-w-0
                   [&::-webkit-search-cancel-button]:hidden"
      />

      {/* Icon button */}
      <button
        onClick={() => onChange(value)}
        aria-label={`Submit ${label} search`}
        className="w-[28px] h-full flex items-center justify-center border-l border-gc-borderStrong
                   text-gc-textMuted hover:bg-gc-accent hover:text-gc-textOnAccent
                   transition-colors duration-150 flex-shrink-0"
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="22" y2="22" />
        </svg>
      </button>
    </div>
  )
}

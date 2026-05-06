/**
 * components/MessageInput.jsx
 * Input bar at the bottom of chat: attach, text field, emoji, send.
 *
 * Props:
 *   onSend  (text: string) => void
 */
import { useState, useRef } from 'react'

export default function MessageInput({ onSend }) {
  const [text, setText] = useState('')
  const inputRef = useRef(null)

  const handleSend = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    onSend(trimmed)
    setText('')
    inputRef.current?.focus()
  }

  return (
    <div className="flex items-center gap-[7px] px-[15px] py-[9px]
                    bg-gc-inputBar border-t border-gc-borderStrong flex-shrink-0">

      {/* Attach */}
      <button
        aria-label="Attach file"
        className="w-[33px] h-[33px] border border-gc-borderStrong bg-transparent
                   text-gc-textMuted flex items-center justify-center flex-shrink-0
                   hover:border-gc-accent hover:text-gc-accent transition-all duration-150"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
        </svg>
      </button>

      {/* Text input */}
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Type a message..."
        aria-label="Message input"
        autoComplete="off"
        className="flex-1 h-[33px] bg-gc-input border border-gc-borderStrong
                   text-gc-textPrimary font-body text-[10.5px] px-[11px]
                   outline-none placeholder:text-gc-textMuted
                   focus:border-gc-accent focus:shadow-[0_0_0_1px_rgba(57,255,106,0.18),0_0_12px_rgba(57,255,106,0.18)]
                   transition-all duration-150"
      />

      {/* Emoji */}
      <button
        aria-label="Add emoji"
        className="w-[33px] h-[33px] border border-gc-borderStrong bg-transparent
                   text-gc-textMuted font-display text-[10px] flex items-center
                   justify-center flex-shrink-0
                   hover:border-gc-accent hover:text-gc-accent transition-all duration-150"
      >
        :)
      </button>

      {/* Send */}
      <button
        onClick={handleSend}
        aria-label="Send message"
        className="h-[33px] px-[15px] bg-gc-accent text-gc-textOnAccent
                   font-display text-[11px] tracking-[0.15em] flex items-center gap-[6px]
                   border border-gc-accent flex-shrink-0
                   shadow-accent-glow hover:bg-gc-accentDim hover:shadow-accent-glow-lg
                   active:scale-[0.97] transition-all duration-150"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
        SEND
      </button>
    </div>
  )
}

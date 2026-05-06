/**
 * components/ChatWindow.jsx
 * Main chat area: header, message thread, typing indicator, input bar.
 *
 * Props:
 *   contact   { id, initials, name, status }
 *   messages  { id, from, text, time }[]
 *   onSend    (text: string) => void
 */
import { useEffect, useRef } from 'react'
import ChatHeader      from './ChatHeader'
import MessageBubble   from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import MessageInput    from './MessageInput'

export default function ChatWindow({ contact, messages, onSend }) {
  const bottomRef = useRef(null)

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <section
      className="flex-1 flex flex-col bg-gc-chat min-w-0"
      aria-label={`Conversation with ${contact.name}`}
    >
      {/* Header */}
      <ChatHeader contact={contact} />

      {/* Message area */}
      <div
        className="flex-1 overflow-y-auto scrollbar-gc px-[18px] py-[14px]
                   flex flex-col gap-[9px]"
        role="log"
        aria-live="polite"
        aria-label="Messages"
      >
        {/* Date divider */}
        <div className="flex items-center gap-[10px] mb-[3px]" aria-label="Today">
          <span className="flex-1 h-px bg-gc-borderMid" />
          <span className="font-display text-[7.5px] tracking-[0.2em] text-gc-textMuted">
            TODAY
          </span>
          <span className="flex-1 h-px bg-gc-borderMid" />
        </div>

        {/* Messages */}
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            from={msg.from}
            text={msg.text}
            time={msg.time}
          />
        ))}

        {/* Typing indicator */}
        <TypingIndicator initials={contact.initials} />

        {/* Scroll anchor */}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <MessageInput onSend={onSend} />
    </section>
  )
}

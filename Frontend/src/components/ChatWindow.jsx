import { useEffect, useRef } from 'react'
import ChatHeader      from './ChatHeader'
import MessageBubble   from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import MessageInput    from './MessageInput'

export default function ChatWindow({ contact, messages, onSend }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div style={{
      flex: 1,
      minWidth: 0,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--color-x-bg)',
    }}>

      {/* Header */}
      <ChatHeader contact={contact} />

      {/* Messages */}
      <div
        className="scroll"
        style={{
          flex: 1,
          overflowY: 'auto',
          minHeight: 0,
          padding: '24px 24px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {/* Date divider */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8,
        }}>
          <div style={{ flex: 1, height: 1, background: 'var(--color-x-border)' }} />
          <span style={{
            fontSize: 10, fontWeight: 500,
            color: 'var(--color-x-text3)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            padding: '3px 10px',
            background: 'var(--color-x-surface3)',
            borderRadius: 20,
            border: '1px solid var(--color-x-border)',
          }}>
            Today
          </span>
          <div style={{ flex: 1, height: 1, background: 'var(--color-x-border)' }} />
        </div>

        {messages.map(msg => (
          <MessageBubble key={msg.id} from={msg.from} text={msg.text} time={msg.time} />
        ))}

        <TypingIndicator initials={contact.initials} />

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <MessageInput onSend={onSend} />
    </div>
  )
}
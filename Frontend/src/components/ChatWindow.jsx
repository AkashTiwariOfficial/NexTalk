import { useEffect, useRef } from 'react'
import ChatHeader      from './ChatHeader'
import MessageBubble   from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import MessageInput    from './MessageInput'

export default function ChatWindow({ contact, messages, onSend }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, contact]);

  console.log(messages);

  return (
    <div style={{
      flex: 1, minWidth: 0, height: '100%',
      display: 'flex', flexDirection: 'column',
      background: 'var(--color-x-bg)',
    }}>
      <ChatHeader contact={contact} />

      {/* Messages area */}
      <div
        className="scroll"
        style={{
          flex: 1, overflowY: 'auto', minHeight: 0,
          padding: '24px 28px 16px',
          display: 'flex', flexDirection: 'column', gap: 14,
          backgroundImage: `radial-gradient(ellipse at 60% 0%, var(--color-x-glow3) 0%, transparent 65%)`,
        }}
      >
        {/* Date divider */}
        <div style={{ display:'flex', alignItems:'center', gap: 14, marginBottom: 8 }}>
          <div style={{ flex:1, height:1, background:'linear-gradient(90deg, transparent, var(--color-x-b1))' }} />
          <span style={{
            fontSize: 10, fontWeight: 600, letterSpacing: '0.06em',
            color: 'var(--color-x-t3)', textTransform: 'uppercase',
            background: 'var(--color-x-s3)', border: '1px solid var(--color-x-b1)',
            borderRadius: 99, padding: '3px 12px',
          }}>
            Today
          </span>
          <div style={{ flex:1, height:1, background:'linear-gradient(90deg, var(--color-x-b1), transparent)' }} />
        </div>

        {messages.map((msg, i) => (
          <div key={msg?._id} className="anim-up" style={{ animationDelay: `${Math.min(i * 0.03, 0.15)}s` }}>
            <MessageBubble from={msg?.sender} text={msg?.message} time={msg?.updatedAt} />
          </div>
        ))}

        <TypingIndicator contact={contact} />
        <div ref={bottomRef} />
      </div>

      <MessageInput onSend={onSend} />
    </div>
  )
}
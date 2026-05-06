/**
 * components/MessageBubble.jsx
 * Single message row — sent or received.
 *
 * Props:
 *   from  "sent" | "recv"
 *   text  string
 *   time  string
 */
export default function MessageBubble({ from, text, time }) {
  const isSent = from === 'sent'

  return (
    <div
      className={`flex flex-col gap-[3px] animate-fade-slide-up
                  ${isSent ? 'items-end' : 'items-start'}`}
      role="article"
      aria-label={`${isSent ? 'You' : 'Them'}: ${text}`}
    >
      <div
        className={`max-w-[70%] px-[12px] py-[8px] font-body text-[10.5px]
                    leading-relaxed border
                    ${isSent
                      ? 'bg-gc-bubbleSent text-gc-textSent border-gc-borderStrong border-r-[3px] border-r-gc-accent shadow-bubble'
                      : 'bg-gc-bubbleRecv text-gc-textPrimary border-gc-borderStrong border-l-[3px] border-l-gc-accent'
                    }`}
      >
        {text}
      </div>
      <span className="font-display text-[7.5px] tracking-[0.12em] text-gc-textMuted px-[3px]">
        {time}
      </span>
    </div>
  )
}

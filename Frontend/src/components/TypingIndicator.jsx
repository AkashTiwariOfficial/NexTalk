/**
 * components/TypingIndicator.jsx
 * Animated "..." indicator shown below messages.
 *
 * Props:
 *   initials  string — contact's initials for mini avatar
 */
export default function TypingIndicator({ initials }) {
  return (
    <div className="flex items-center gap-[7px] mt-1" aria-label="Contact is typing">
      <div className="w-[22px] h-[22px] bg-gc-monoBg text-gc-monoText
                      flex items-center justify-center font-display text-[8px]
                      border border-gc-borderStrong flex-shrink-0">
        {initials}
      </div>
      <div className="flex gap-[4px] px-[11px] py-[7px] bg-gc-bubbleRecv
                      border border-gc-borderStrong border-l-[3px] border-l-gc-accent">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{ animationDelay: `${i * 0.2}s` }}
            className="w-[5px] h-[5px] bg-gc-accent rounded-full animate-typing"
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  )
}

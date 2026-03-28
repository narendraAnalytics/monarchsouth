import { useState, useEffect, useRef } from 'react'

const CHARS = '!<>-_\\/[]{}—=+*^?#@$%'

function useTextScramble(text: string, delay = 0, duration = 1400) {
  const [displayText, setDisplayText] = useState(() =>
    text
      .split('')
      .map((c) => (c === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]))
      .join('')
  )
  const frameRef = useRef(0)
  const startRef = useRef(0)
  const frameCountRef = useRef(0)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const scramble = (timestamp: number) => {
      if (startRef.current === 0) startRef.current = timestamp
      frameCountRef.current++

      // Update display every 3 frames (~20fps) for authentic scramble feel
      if (frameCountRef.current % 3 === 0) {
        const elapsed = timestamp - startRef.current
        const progress = Math.min(elapsed / duration, 1)
        const resolvedCount = Math.floor(progress * text.length)

        setDisplayText(
          text
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' '
              if (i < resolvedCount) return char
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            })
            .join('')
        )

        if (progress >= 1) return
      }

      frameRef.current = requestAnimationFrame(scramble)
    }

    timeoutId = setTimeout(() => {
      startRef.current = 0
      frameCountRef.current = 0
      frameRef.current = requestAnimationFrame(scramble)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      cancelAnimationFrame(frameRef.current)
    }
  }, [text, delay, duration])

  return displayText
}

interface TextScrambleProps {
  text: string
  className?: string
  style?: React.CSSProperties
  delay?: number
  duration?: number
}

export default function TextScramble({
  text,
  className,
  style,
  delay = 0,
  duration = 1400,
}: TextScrambleProps) {
  const displayText = useTextScramble(text, delay, duration)

  return (
    <span className={className} style={style} aria-label={text}>
      {displayText}
    </span>
  )
}

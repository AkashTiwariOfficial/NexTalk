/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
       extend: {
      /**
       * ─── CHANGE YOUR THEME COLORS HERE ───────────────────────────────
       * All colors are defined once in this block.
       * Every component references these tokens — nothing is hardcoded.
       * ─────────────────────────────────────────────────────────────────
       */
      colors: {
        gc: {
          // Surfaces
          app:         '#0B1A10',
          sidebar:     '#0F2018',
          sidebarHead: '#0A2E16',
          chat:        '#0B1A10',
          chatHead:    '#0F2018',
          inputBar:    '#0F2018',
          input:       '#142A1A',
          bubbleRecv:  '#132B1C',
          bubbleSent:  '#1A4D28',

          // Accent / brand
          accent:      '#39FF6A',
          accentDim:   '#27C44E',

          // Text
          textPrimary:   '#D4F5DC',
          textSecondary: '#6BA878',
          textMuted:     '#3D6E4A',
          textOnAccent:  '#061008',
          textSent:      '#C8F5D4',

          // Borders
          borderStrong: '#1E4D2B',
          borderMid:    '#1A3D24',

          // Search tags
          chatTagBg:    '#39FF6A',
          chatTagText:  '#061008',
          globalTagBg:  '#1A4D28',
          globalTagText:'#39FF6A',

          // Badges
          badgeBg:   '#39FF6A',
          badgeText: '#061008',

          // Monograms
          monoBg:         '#1A4D28',
          monoText:       '#39FF6A',
          monoActiveBg:   '#39FF6A',
          monoActiveText: '#061008',

          // Contacts
          contactHover:     '#112618',
          contactActiveBg:  '#0F3D1E',
          contactActiveBar: '#39FF6A',

          // Online dot
          online:  '#39FF6A',
          away:    '#F5A623',
          offline: '#3D6E4A',
        },
      },
      fontFamily: {
        display: ['"Share Tech Mono"', 'monospace'],
        body:    ['"DM Mono"', 'monospace'],
      },
      boxShadow: {
        'accent-glow': '0 0 16px rgba(57,255,106,0.25)',
        'accent-glow-lg': '0 0 32px rgba(57,255,106,0.35)',
        'bubble': '0 0 20px rgba(57,255,106,0.06)',
        'app': '0 0 0 1px #1A3D24, 0 0 60px rgba(57,255,106,0.06), 0 30px 80px rgba(0,0,0,0.6)',
      },
      keyframes: {
        blinkBorder: {
          '0%,100%': { borderColor: '#39FF6A', opacity: '1' },
          '50%':     { borderColor: '#27C44E', opacity: '0.5' },
        },
        pulse: {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%':     { opacity: '0.5', transform: 'scale(0.8)' },
        },
        typingBlink: {
          '0%,80%,100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '40%':          { opacity: '1',   transform: 'scale(1)' },
        },
        scanline: {
          '0%':   { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 4px' },
        },
        fadeSlideUp: {
          '0%':   { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'blink-border':  'blinkBorder 2s infinite',
        'pulse-dot':     'pulse 2s infinite',
        'typing':        'typingBlink 1.2s infinite',
        'fade-slide-up': 'fadeSlideUp 0.2s ease-out forwards',
      },
    },
  },
}
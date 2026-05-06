/**
 * data/contacts.js
 * Mock contacts. Replace with API calls in production.
 */
export const CONTACTS = [
  { id: 'ax', initials: 'AX', name: 'Axel Vern',   preview: 'Deploy is live 🚀',       time: '09:47', unread: 3, status: 'online'  },
  { id: 'rl', initials: 'RL', name: 'Riya Lal',    preview: 'Can you review the PR?',  time: '09:12', unread: 0, status: 'online'  },
  { id: 'mk', initials: 'MK', name: 'Max Kern',    preview: 'Ping me when you\'re back',time: '08:55', unread: 1, status: 'away'    },
  { id: 'zp', initials: 'ZP', name: 'Zara Patel',  preview: 'Shared a file',           time: 'Yesterday', unread: 0, status: 'offline' },
  { id: 'nd', initials: 'ND', name: 'Nova Dev',    preview: 'Tests are passing ✓',     time: 'Yesterday', unread: 7, status: 'online'  },
  { id: 'jw', initials: 'JW', name: 'Jin Wu',      preview: 'Let\'s sync tomorrow',    time: 'Mon',   unread: 0, status: 'offline' },
]

export const MESSAGES = {
  ax: [
    { id: 1, from: 'recv', text: 'Hey! Pushed the latest build to staging.', time: '09:30' },
    { id: 2, from: 'sent', text: 'Nice. Did you run the smoke tests?',       time: '09:32' },
    { id: 3, from: 'recv', text: 'Yes — all green. Zero regressions.',       time: '09:33' },
    { id: 4, from: 'sent', text: "Perfect. I'll approve and merge.",         time: '09:40' },
    { id: 5, from: 'recv', text: 'Deploy is live 🚀',                        time: '09:47' },
  ],
  rl: [
    { id: 1, from: 'recv', text: 'I opened a PR for the auth refactor.',    time: '08:50' },
    { id: 2, from: 'sent', text: 'On it. Give me 20 mins.',                 time: '09:00' },
    { id: 3, from: 'recv', text: 'Can you review the PR?',                  time: '09:12' },
  ],
  mk: [
    { id: 1, from: 'sent', text: 'Heading to a meeting. Back at 10.',       time: '08:40' },
    { id: 2, from: 'recv', text: "Ping me when you're back",                time: '08:55' },
  ],
  zp: [
    { id: 1, from: 'recv', text: 'Here are the design specs.',              time: 'Yesterday' },
    { id: 2, from: 'sent', text: 'Got it, reviewing now.',                  time: 'Yesterday' },
  ],
  nd: [
    { id: 1, from: 'recv', text: 'CI pipeline fixed.',                      time: 'Yesterday' },
    { id: 2, from: 'sent', text: 'What was the issue?',                     time: 'Yesterday' },
    { id: 3, from: 'recv', text: 'Flaky integration test. Removed the sleep.', time: 'Yesterday' },
    { id: 4, from: 'recv', text: 'Tests are passing ✓',                     time: 'Yesterday' },
  ],
  jw: [
    { id: 1, from: 'sent', text: "You free this week for a sync?",          time: 'Mon' },
    { id: 2, from: 'recv', text: "Let's sync tomorrow",                     time: 'Mon' },
  ],
}

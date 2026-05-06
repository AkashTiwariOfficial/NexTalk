export const CONTACTS = [
  { id: 'a1', initials: 'AR', name: 'Aria Ross',     preview: 'just pushed the fix 🚀',     time: '09:47', unread: 3, status: 'online'  },
  { id: 'b2', initials: 'KM', name: 'Kai Morrow',    preview: 'can you review my PR?',       time: '09:12', unread: 0, status: 'online'  },
  { id: 'c3', initials: 'ZL', name: 'Zoe Lane',      preview: 'ping me when you\'re free',   time: '08:55', unread: 1, status: 'away'    },
  { id: 'd4', initials: 'NP', name: 'Noah Park',     preview: 'shipped the new design ✓',    time: 'Yesterday', unread: 0, status: 'offline' },
  { id: 'e5', initials: 'SC', name: 'Sofia Chen',    preview: 'meeting at 3?',               time: 'Yesterday', unread: 5, status: 'online'  },
  { id: 'f6', initials: 'JB', name: 'Jake Burns',    preview: 'lgtm, merging now',           time: 'Mon',   unread: 0, status: 'offline' },
]

export const MESSAGES = {
  a1: [
    { id: 1, from: 'recv', text: 'Hey! I just pushed the auth fix to staging.',      time: '09:30' },
    { id: 2, from: 'sent', text: 'Nice. Did the tests pass?',                        time: '09:32' },
    { id: 3, from: 'recv', text: 'All green ✅ — no regressions.',                   time: '09:34' },
    { id: 4, from: 'sent', text: 'Perfect. Approving and merging now.',              time: '09:40' },
    { id: 5, from: 'recv', text: 'just pushed the fix 🚀',                           time: '09:47' },
  ],
  b2: [
    { id: 1, from: 'recv', text: 'Opened a PR for the new dashboard layout.',       time: '08:50' },
    { id: 2, from: 'sent', text: 'Give me 20 mins, I\'ll take a look.',             time: '09:00' },
    { id: 3, from: 'recv', text: 'can you review my PR?',                           time: '09:12' },
  ],
  c3: [
    { id: 1, from: 'sent', text: 'In a meeting until 10, brb.',                     time: '08:40' },
    { id: 2, from: 'recv', text: 'ping me when you\'re free',                       time: '08:55' },
  ],
  d4: [
    { id: 1, from: 'recv', text: 'New design is live on staging.',                  time: 'Yesterday' },
    { id: 2, from: 'sent', text: 'Looks great! Love the spacing.',                  time: 'Yesterday' },
    { id: 3, from: 'recv', text: 'shipped the new design ✓',                        time: 'Yesterday' },
  ],
  e5: [
    { id: 1, from: 'recv', text: 'Can we push today\'s standup to 3pm?',            time: 'Yesterday' },
    { id: 2, from: 'sent', text: 'Works for me.',                                   time: 'Yesterday' },
    { id: 3, from: 'recv', text: 'meeting at 3?',                                   time: 'Yesterday' },
  ],
  f6: [
    { id: 1, from: 'sent', text: 'PR is up, can you take a look?',                  time: 'Mon' },
    { id: 2, from: 'recv', text: 'lgtm, merging now',                               time: 'Mon' },
  ],
}
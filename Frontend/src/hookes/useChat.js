/**
 * hooks/useChat.js
 * Manages active contact, messages, and send logic.
 * Swap the data layer here when connecting a real API.
 */
import { useState, useCallback } from 'react'
import { CONTACTS, MESSAGES } from '../data/contacts'

export function useChat() {
  const [activeId, setActiveId]   = useState(CONTACTS[0].id)
  const [messages, setMessages]   = useState(MESSAGES[CONTACTS[0].id] ?? [])

  const selectContact = useCallback((id) => {
    setActiveId(id)
    setMessages(MESSAGES[id] ?? [])
  }, [])

  const sendMessage = useCallback((text) => {
    const msg = {
      id:   Date.now(),
      from: 'sent',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages((prev) => [...prev, msg])
  }, [])

  const activeContact = CONTACTS.find((c) => c.id === activeId)

  return { CONTACTS, activeContact, messages, selectContact, sendMessage }
}

import { useState, useCallback } from 'react'
import { CONTACTS, MESSAGES } from '../data/data'

export function useChat() {
  const [activeId, setActiveId] = useState(CONTACTS[0].id)
  const [allMessages, setAllMessages] = useState(MESSAGES)
  const [chatSearch, setChatSearch] = useState('')
  const [globalSearch, setGlobalSearch] = useState('')

  const filteredContacts = CONTACTS.filter(c =>
    c.name.toLowerCase().includes(chatSearch.toLowerCase())
  )

  const selectContact = useCallback((id) => {
    setActiveId(id)
    setGlobalSearch('')
  }, [])

  const sendMessage = useCallback((text) => {
    const msg = {
      id: Date.now(),
      from: 'sent',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setAllMessages(prev => ({
      ...prev,
      [activeId]: [...(prev[activeId] ?? []), msg],
    }))
  }, [activeId])

  const activeContact = CONTACTS.find(c => c.id === activeId)
  const messages = allMessages[activeId] ?? []

  return {
    contacts: filteredContacts,
    activeContact,
    messages,
    chatSearch, setChatSearch,
    globalSearch, setGlobalSearch,
    selectContact,
    sendMessage,
  }
}
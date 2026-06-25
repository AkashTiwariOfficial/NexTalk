import { useState, useCallback, useEffect } from 'react';
import { CONTACTS, MESSAGES } from '../data/data';
import { useChatContext } from './context/useChatContext.jsx';

export function useChat() {

  const { currentUser, contacts, allMessages, setAllMessages } = useChatContext();
  const [activeId,     setActiveId]  = useState(null);
  const [chatSearch,   setChatSearch]   = useState('');
  const [globalSearch, setGlobalSearch] = useState('');


/*   const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(chatSearch?.toLowerCase()) ||
    c.preview.toLowerCase().includes(chatSearch?.toLowerCase())
  ) */

  const selectContact = useCallback((id) => setActiveId(id), []);

  const sendMessage = useCallback((text) => {
    const msg = {
      id:   Date.now(),
      from: 'sent',
      text,
      time: new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }),
    }
    setAllMessages(prev => ({
      ...prev,
      [activeId]: [...(prev[activeId] ?? []), msg],
    }))
  }, [activeId])

  return {
    contacts: contacts,
    activeContact: contacts.find(c => c._id === activeId || null),
    messages: allMessages,
    chatSearch,   setChatSearch,
    globalSearch, setGlobalSearch,
    selectContact,
    sendMessage,
  }
}
import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../../hookes/auth/useLOGOUT'
import Sidebar from '../../components/Sidebar'
import ChatWindow from '../../components/ChatWindow'
import { useChat } from '../../hookes/useChat'
import { useContacts } from "../../hookes/ApiCalls/useContacts.jsx";
import { useChatContext } from '../../hookes/context/useChatContext.jsx';
import { useEffect } from "react";



export default function Home() {

  const { fetchContacts } = useContacts();
  const { currentUser } = useChatContext();

  useEffect(() => {
    fetchContacts();
  }, []);

  const { Logout } = useLogout();
  const handleLogout = async () => {
    await Logout();
  }

  const {
    contacts, activeContact, messages,
    chatSearch, setChatSearch,
    globalSearch, setGlobalSearch,
    selectContact, sendMessage,
  } = useChat();

  return (
    <div>
      <div style={{ width: '100vw', height: '100vh', display: 'flex', overflow: 'hidden', background: 'var(--color-x-bg)' }}>
        <Sidebar
          contacts={contacts}
          activeId={activeContact}
          chatSearch={chatSearch} setChatSearch={setChatSearch}
          globalSearch={globalSearch} setGlobalSearch={setGlobalSearch}
          onSelect={selectContact}
        />
        <ChatWindow
          contact={activeContact}
          messages={messages}
          onSend={sendMessage}
        />
      </div>
 
 <Link to="/login" className='bg-blue p-5 text-white'>Login</Link> 
    </div>
  )
}

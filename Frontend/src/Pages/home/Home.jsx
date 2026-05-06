import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../../hookes/auth/useLOGOUT'
/**
 * App.jsx — Root component
 * Wires Sidebar ↔ ChatWindow via the useChat hook.
 */
import Sidebar    from '../../components/Sidebar'
import ChatWindow from '../../components/ChatWindow'
import { useChat } from '../../hookes/useChat'



export default function Home() {
const {Logout} = useLogout();
  const handleLogout = async () => {
    await Logout();
  }
   const {
    contacts,
    activeContact,
    messages,
    chatSearch, setChatSearch,
    globalSearch, setGlobalSearch,
    selectContact,
    sendMessage,
  } = useChat()
  return (
    <div>
          <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      overflow: 'hidden',
      background: 'var(--color-x-bg)',
    }}>
      <Sidebar
        contacts={contacts}
        activeId={activeContact.id}
        chatSearch={chatSearch}
        setChatSearch={setChatSearch}
        globalSearch={globalSearch}
        setGlobalSearch={setGlobalSearch}
        onSelect={selectContact}
      />
      <ChatWindow
        contact={activeContact}
        messages={messages}
        onSend={sendMessage}
      />
    </div>
      <Link to="/register" className='p-5 bg-red-600 m-5'>signup</Link>
         <Link to="/login" className='p-5 bg-red-600'>Login</Link>
           <button onClick={handleLogout} className='p-5 bg-red-600'>Logout</button>
    </div>
  )
}

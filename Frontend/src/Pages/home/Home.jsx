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
    const { CONTACTS, activeContact, messages, selectContact, sendMessage } = useChat()
  return (
    <div>
          <div className="h-screen w-screen flex items-center justify-center bg-gc-app p-6">
      {/*
        App shell
        — shadow-app   : outer glow + depth
        — scanlines    : subtle CRT texture overlay (defined in index.css)
      */}
      <div className="relative flex w-full max-w-[960px] h-[620px] border border-gc-borderStrong
                      bg-gc-app shadow-app overflow-hidden">

        {/* Scanline overlay — sits on top, pointer-events:none */}
        <div className="scanlines absolute inset-0 z-10 pointer-events-none" aria-hidden="true" />

        {/* Sidebar */}
        <Sidebar
          contacts={CONTACTS}
          activeId={activeContact.id}
          onSelect={selectContact}
        />

        {/* Chat */}
        <ChatWindow
          contact={activeContact}
          messages={messages}
          onSend={sendMessage}
        />
      </div>
    </div>
      <Link to="/register" className='p-5 bg-red-600 m-5'>signup</Link>
         <Link to="/login" className='p-5 bg-red-600'>Login</Link>
           <button onClick={handleLogout} className='p-5 bg-red-600'>Logout</button>
    </div>
  )
}

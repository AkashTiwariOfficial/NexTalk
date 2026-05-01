import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ChatState from './Conntext/chat/ChatState.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ChatState>
    <App />
    </ChatState>
  </BrowserRouter>
  </StrictMode>,
)

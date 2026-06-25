import { Children, useState } from "react";
import { ChatContext } from "./ChatContext.jsx";


export default function chatState({ children }) {

    const user = localStorage.getItem("user");
    const currentUser = user ? JSON.parse(user) : "";
    const host = import.meta.env.VITE_HOST_LINK;
    const token = localStorage.getItem("accessToken");
    const [contacts, setContacts] = useState([]);
      const [allMessages,  setAllMessages]  = useState([]);

  return (
    <div>
        <ChatContext.Provider value={{currentUser, host, token, contacts, setContacts, allMessages, setAllMessages}}>
            {children}
        </ChatContext.Provider>
    </div>
  )
}

import { Children, useState } from "react";
import { ChatContext } from "./ChatContext.jsx";


export default function chatState({ children }) {

    const user = localStorage.getItem("user");
    const currentUser = user ? JSON.parse(user) : "";
    const host = import.meta.env.VITE_HOST_LINK;
    const token = localStorage.getItem("accessToken");
  

  return (
    <div>
        <ChatContext.Provider value={{currentUser, host, token}}>
            {children}
        </ChatContext.Provider>
      
    </div>
  )
}

import { useContext } from "react";
import { ChatContext } from "../../Conntext/chat/ChatContext.jsx";

export const useChatContext = () => {
    return useContext(ChatContext);
};
import axios from "axios";
import { useChatContext } from "../context/useChatContext.jsx";
import { useState } from "react";
import toast from 'react-hot-toast';
import { info } from "console";



export const useMessage = () => {

    const { host, token, setAllMessages } = useChatContext();

    const SendMessage = async (id, info) => {
       
      try {
            const response = await axios.post(`${host}/v1/api/messages/sendMessage/${id}`, { info } {
                  headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            })

            if (response.data.success) {
                console.log(response.data.data);
              setAllMessages(response.data.data);
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Internal Server Error!");
        }
    }

    return { SendMessage }
    
};



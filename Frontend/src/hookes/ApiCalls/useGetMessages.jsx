import axios from "axios";
import { useChatContext } from "../context/useChatContext.jsx";
import { useState } from "react";
import toast from 'react-hot-toast';



export const useGetMessages = () => {

    const { host, token, setAllMessages } = useChatContext();

    const fetchMessages = async (id) => {
       
      try {
            const response = await axios.get(`${host}/v1/api/messages/getAllMessages/${id}`,  {
                  headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            })

            if (response.data.success) {
              setAllMessages(response.data.data);
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Internal Server Error!");
        }
    }

    return { fetchMessages }
    
};



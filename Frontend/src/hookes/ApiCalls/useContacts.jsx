import axios from "axios";
import { useChatContext } from "../context/useChatContext.jsx";
import { useState } from "react";
import toast from 'react-hot-toast';



export const useContacts = () => {

    const { host, token, setContacts } = useChatContext();

    const fetchContacts = async () => {
       
      try {
            const response = await axios.get(`${host}/v1/api/users/getAllConversation`,  {
                  headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });

            if (response.data.success) {
              setContacts(response.data.data);
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Internal Server Error!");
        }
    }

    return { fetchContacts }
};



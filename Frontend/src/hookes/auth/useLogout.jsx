import axios from "axios";
import { useChat } from "../context/useChat.jsx";
import { useState } from "react";
import toast from 'react-hot-toast';


export const useLogout = () => {

    const [loading, setLoading] = useState(false);
    const { host, token } = useChat();

    const Logout = async () => {
        setLoading(true);

        try {
            const response = await axios.post(`${host}/v1/api/auth/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });

            if (response.data.success) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("user");
                localStorage.removeItem("timeofAT");
                setLoading(false);
                toast.success("Logged out successfully");
                  return true;
            }

        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message || "Logout failed!");
        }
    }

    return { Logout, loading }
};



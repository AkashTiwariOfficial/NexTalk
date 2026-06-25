import axios from "axios";
import { useChat } from "../context/useChat.jsx";
import { useState } from "react";
import toast from 'react-hot-toast';


export const useLogin = () => {

    const [loading, setLoading] = useState(false);
    const { host } = useChat();

    const Login = async (body) => {
        setLoading(true);
        const toastId = toast.loading("Logging In ...");

        try {
            const response = await axios.post(`${host}/v1/api/auth/login`, body, {
                headers: {
                    "Content-Type": "application/json",
                }, timeout: 15000
            })
 
            if (response.data.success) {
                  const userDetails = response.data.data.data;
                localStorage.setItem("accessToken", response.data.data.tokenAccess);
                localStorage.setItem("refreshToken", response.data.data.tokenRefresh);
                localStorage.setItem("user", JSON.stringify(userDetails));
                localStorage.setItem("timeofAT", Date.now());
                setLoading(false);
                toast.success("Logged In successfully", { id: toastId });
                return true;
            }

        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message || "Login failed!", { id: toastId });
        }
    }

    return { Login, loading }
};



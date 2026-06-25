import axios from "axios";
import { useChatContext } from "../context/useChatContext.jsx";
import { useState } from "react";
import toast from 'react-hot-toast';



export const useSigIn = () => {

    const [loading, setLoading] = useState(false);
    const { host } = useChatContext();

    const signIn = async (formData) => {
        setLoading(true);
        const toastId = toast.loading("Creating Account");

        try {
            const response = await axios.post(`${host}/v1/api/auth/register`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
 
            if (response.data.success) {
                setLoading(false);
                toast.success("Account created successfully 🚀", { id: toastId });
                return true;
            }

        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message || "Signup failed!", { id: toastId });
        }
    }

    return { signIn, loading }
};



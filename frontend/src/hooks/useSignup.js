import { useState } from "react";
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const handleInputErrors = ({ email, password, confirmPassword }) => {
    if (!email || !password || !confirmPassword) {
        toast.error("please fill in all the fields");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("passwords do not match");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({ email, password, confirmPassword }) => {
        const success = handleInputErrors({ email, password, confirmPassword });

        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch("http://localhost:8000/api/v1/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password, confirmPassword }),
            });

            const data = await res.json();
            // console.log(data)
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("game-user", JSON.stringify(data));
            setAuthUser(data);
        } catch (error) {
            // console.log(error.message)
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }
    return { loading, signup }
}

export default useSignup;
import { toast } from "react-toastify";
import { ErrorType } from "@/types/helperTypes";
import { useState } from "react";
const useHandleError = () => {
    const [error, setError] = useState<ErrorType | null>();
    const handleError = (error: ErrorType | null) => {
        if (error) {
            toast(error?.message);
        }
    };

    return { handleError };
};

export default useHandleError;

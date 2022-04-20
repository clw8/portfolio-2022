import React, { createContext, useContext, useState } from "react";

const toastTypes = {
    SUCCESS: "success",
    ERROR: "error"
}

export const ToastContext = createContext()

const ToastProvider = ({ children }) => {
    const [toastIsShown, setShowToast] = useState(false);
    const [toastType, setToastType] = useState(toastTypes.SUCCESS);
    const [toastMessage, setToastMessage] = useState("");

    return (
        <ToastContext.Provider value={{ 
            toastIsShown,
            setShowToast,  
            toastType, 
            setToastType,
            toastTypes, 
            toastMessage, 
            setToastMessage
        }}>
            {children}
        </ToastContext.Provider>
    )
}

export default ToastProvider;
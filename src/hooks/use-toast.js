import { useContext } from "react";
import { ToastContext } from "../context-providers/toast-provider"

const useToast = () => {
    const {
        toastIsShown, setShowToast, toastType, setToastType, toastTypes, toastMessage, setToastMessage
    } = useContext(ToastContext)

    const showErrorToast = (message = "") => {
        setShowToast(true)
        setToastMessage(message)
        setToastType(toastTypes.ERROR)
    }

    const showSuccessToast = (message = "") => {
        setShowToast(true)
        setToastMessage(message)
        setToastType(toastTypes.SUCCESS)
    }

    const hideToast = () => {
        setShowToast(false)
        setToastMessage("")
    }

    return {
    toastIsShown, toastType, toastTypes, toastMessage, hideToast, showErrorToast,  showSuccessToast
    }
}

export default useToast

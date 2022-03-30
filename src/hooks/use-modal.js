import * as React from "react"
import Reveal from 'react-reveal';

const useModal = (children) => {
    const [modalShown, setModalShown] = React.useState(false)
    const [modalChildren, setModalChildren] = React.useState(children) // children must be a function
    
    if (children && React.isValidElement) {
        console.warn("children must be declared in the modal as a function")
    }

    const openModal = (children) => {
        console.log("open", !modalShown)
        setModalShown(!modalShown)

        if (children && !React.isValidElement) {
            console.warn("children must be declared in the modal as a function")
        }

        children && setModalChildren(children) // children must be a function
    }

    const modalClass = `modal ${modalShown ? "modal__enter" : "modal__leave"}`

    const renderModal = (
        <div className={modalClass}>
            {modalChildren}
        </div>
    )

    return [
        renderModal,
        modalShown,
        openModal,
    ]
}

export default useModal
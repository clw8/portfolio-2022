import * as React from "react"
import Reveal from 'react-reveal';

const useModal = (children) => {
    const [modalShown, setModalShown] = React.useState(false)
    const [modalChildren, setModalChildren] = React.useState(children) // children must be a function
    const [initialAnimationPlayState, setInitialAnimationPlayState] = React.useState(false) // children must be a function
    
    if (children && React.isValidElement) {
        console.warn("children must be declared in the modal as a function")
    }

    const openModal = (children) => {
        setModalShown(!modalShown)
        !initialAnimationPlayState && setInitialAnimationPlayState(true)
        
        if (children) {
            if (!React.isValidElement) console.warn("children must be declared in the modal as a function")
            else setModalChildren(children) // children must be a function
        }
    }

    const modalClass = `modal ${modalShown ? "modal__enter" : (initialAnimationPlayState ? "modal__leave" : "")}`

    const renderModal = (
        <div className={modalClass}>
            <div className="modal__inner">
                {modalChildren}
            </div>
        </div>
    )

    return [
        renderModal,
        modalShown,
        openModal,
    ]
}

export default useModal
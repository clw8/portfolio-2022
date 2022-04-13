import * as React from "react"
import CloseIcon from "../images/icons/cancel.png"

const useModal = (children, options = {style: {}}) => {
    const [modalShown, setModalShown] = React.useState(false)
    const [modalChildren, setModalChildren] = React.useState(children) // children must be a function
    const [animation, setAnimation] = React.useState(3)

    const preventScroll = () => {
        document.body.style.overflow = "hidden"
      }

    const enableScroll = () => {
        document.body.style.overflow = ""
      }

    const openModal = (children) => {
        preventScroll() 
        setModalShown(true)
        setAnimation(1)
        
        if (children && React.isValidElement(children)) {
            setModalChildren(children)
        }
    }
    
    const closeModal = () => {
        setModalShown(false)
        setAnimation(0)
        enableScroll()
        options.onClose && options.onClose()
    }

    const onAnimationEnd = () => {
        if (animation === 0) setAnimation(3)
        else if (animation === 1) setAnimation(4)
    }


    const renderModal = (
        <div className="modal" style={options.style} animation={animation} onAnimationEnd={onAnimationEnd} >
            <div className="modal__inner">
                <div className="project-modal__close"  onClick={closeModal}>
                    <img src={CloseIcon} className="project-modal__close"  onClick={closeModal} />
                </div>
                {modalChildren}
            </div>
        </div>
    )

    return [
        renderModal,
        modalShown,
        openModal,
        closeModal
    ]
}

export default useModal
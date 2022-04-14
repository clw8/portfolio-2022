import * as React from "react"

const useModal = (children, options = {style: {}}) => {
    const [modalShown, setModalShown] = React.useState(false)
    const [modalChildren, setModalChildren] = React.useState(children) // children must be a function
    const [animation, setAnimation] = React.useState("out-right-end")

    const preventScroll = () => {
        document.body.style.overflow = "hidden"
      }

    const enableScroll = () => {
        document.body.style.overflow = ""
      }

    const openModal = (e, transitionInLeft = false, children) => {
        preventScroll() 
        setModalShown(true)
        if(transitionInLeft) setAnimation("in-left")
        else setAnimation("in-right")
        
        if (children && React.isValidElement(children)) {
            setModalChildren(children)
        }
    }
    
    const closeModal = (e, transitionOutLeft = false ) => {
        setModalShown(false)
        if (transitionOutLeft) setAnimation("out-left")
        else setAnimation("out-right")
        enableScroll()
    }

    const onAnimationEnd = (e) => {
        if(e.target.className === "modal") {
            if (animation === "out-right") setAnimation("out-right-end")
            else if (animation === "out-left") setAnimation("out-left-end")
            else if (animation === "in-right") setAnimation("in-right-end") 
            else if (animation === "in-left") setAnimation("in-left-end") 
        }
    }

    const renderModal = (
        <div className="modal" style={options.style} animation={animation} onAnimationEnd={onAnimationEnd}>
            <div className="modal__inner">
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
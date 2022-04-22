import React, {useEffect, useState} from "react"
import Fade from 'react-reveal/Fade';

const defaultAnimations = {
    in: "in-right",
    inEnd: "in-right-end",
    out: "out-right",
    outEnd: "out-right-end",
}

const Modal = (props) => {
    const {children, style, show, usePopState = true, animations = defaultAnimations, onClose } = props
    const [animation, setAnimation] = React.useState(animations.outEnd)
    const [initialLoad, setInitialLoad] = useState(true)

    const preventScroll = () => {
        document.body.style.overflow = "hidden"
    }

    const enableScroll = () => {
        document.body.style.overflow = ""
    }

    useEffect(() => {
        if (initialLoad) {
            setInitialLoad(false)
        } else {
            show ? openModal() : closeModal()
        }
    }, [show])

    const openModal = () => {
        preventScroll() 
        if (animations.in) setAnimation(animations.in)
        if (usePopState) window.history.pushState({}, "/") // on back close the modal
    }

    const closeModal = (event) => {
        enableScroll()  // should come first, perhaps another modal is opened immediately after this is closed
        if (animations.out) setAnimation(animations.out)
        onClose && onClose(event)
    }

    const onAnimationEnd = (e) => {
        if(e.target.className === "modal") {
            if (animation === animations.out) setAnimation(animations.outEnd)
            else if (animation === animations.in) setAnimation(animations.inEnd) 
        }
    }

    // back button functionality, if needed
    useEffect(() => {
        if (usePopState) {
            const popStateListener = (e) => show && closeModal(e)
            window.addEventListener("popstate", popStateListener)
            return () => window.removeEventListener("popstate", popStateListener)
        }
    }, [show, onClose])

    // user can use escape key to exit the modal
    useEffect(() => {
        const keyListener = (e) => {
            if (e.keyCode === 27 && show) {
                closeModal(e)
            }
        }

        document.addEventListener("keydown", keyListener)
        return () => document.removeEventListener("keydown", keyListener)
    }, [show, onClose])

    return (
        <div role="dialog" aria-hidden={!show} className="modal" style={style} animation={animation} onAnimationEnd={onAnimationEnd}>
            <div className="modal__inner">
                {children}
            </div>
        </div>
    )
}

export default Modal

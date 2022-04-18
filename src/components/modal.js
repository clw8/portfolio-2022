import React, {useEffect, useState} from "react"
import Fade from 'react-reveal/Fade';


const Modal = (props) => {
    const { children, style, show, animations, onNavigateBack, usePopState = true } = props
    const [animation, setAnimation] = React.useState("out-right-end")
    const [initialLoad, setInitialLoad] = useState(false)
    const [prevShow, setPrevShow] = useState(show)
    // TODO.. come back to this? back button to trigger going to prev modal

    //const [uniqueModalKey, ] = React.useState(Math.random().toString())

    const preventScroll = () => {
        document.body.style.overflow = "hidden"
    }

    const enableScroll = () => {
        document.body.style.overflow = ""
    }

    useEffect(() => {
        if (show !== prevShow) {
            if (show && !initialLoad) {
                setInitialLoad(true)
                openModal()
            } else if(initialLoad) {
                show ? openModal() : closeModal()
            }
            setPrevShow(show)
        }
    }, [show])

    const openModal = () => {
        preventScroll() 
        if (animations.in) setAnimation(animations.in)
        if (usePopState) window.history.pushState({}, "/") // on back close the modal
    }

    const closeModal = () => {
        enableScroll()  // should come first, perhaps another modal is opened immediately after this is closed
        if (animations.out) setAnimation(animations.out)
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
            const eventListenerPopState = () => {
                closeModal()
            }
            window.addEventListener("popstate", eventListenerPopState)
      
            return () => window.removeEventListener("popstate", eventListenerPopState)
        }
    }, [prevShow, show, usePopState])



    return (
        <div className="modal" style={style} animation={animation} onAnimationEnd={onAnimationEnd}>
            <div className="modal__inner">
                {children}
            </div>
        </div>
    )
}

export default Modal

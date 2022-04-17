import * as React from "react"
// import { navigate } from "gatsby"

// TODO.. come back to this? back button to trigger going to prev modal
//window.modalList = []

const useModal = (children, options = {style: {}, onOpen: () => {}, onClose: () => {}}) => {
    const [modalShown, setModalShown] = React.useState(false)
    const [modalChildren, setModalChildren] = React.useState(children) // children must be a function
    const [animation, setAnimation] = React.useState("out-right-end")
    // TODO.. come back to this? back button to trigger going to prev modal
    // const [uniqueModalKey, ] = React.useState(Math.random().toString())

    const preventScroll = () => {
        document.body.style.overflow = "hidden"
      }

    const enableScroll = () => {
        document.body.style.overflow = ""
      }

    const openModal = (e, transitionInLeft = false, children) => {
        preventScroll() 
        console.log("open")
        options.onOpen && options.onOpen()
        
        
        setModalShown(true)
        if(transitionInLeft) setAnimation("in-left")
        else setAnimation("in-right")
        
        if (children && React.isValidElement(children)) {
            setModalChildren(children)
        }

        window.history.pushState({}, "/")

        // TODO.. come back to this? back button to trigger going to prev modal
        //window.modalList.push(uniqueModalKey)
    }
    
    const closeModal = (e, transitionOutLeft = false ) => {
        console.log("closeModal", modalShown)
        //if (modalShown) { // causes bug when used in another component's render
            enableScroll()  
            setModalShown(false)
            if (transitionOutLeft) setAnimation("out-left")
            else setAnimation("out-right")
        //}
    }

    React.useEffect(() => {
        const eventListenerPopState = () => {
            console.log("here", window.modalList, modalShown)
            if(modalShown) {
                closeModal()
                options.onClose && options.onClose()
            } 

            // TODO.. come back to this? back button to trigger going to prev modal
            // window.modalList.pop()
            // // trigger general modal close event (all modals must be closed)
            // if (!window.modalList.length) {
                //     options.onClose && options.onClose()
            // }


            // if (window.modalList.length && window.modalList[window.modalList.length - 1] === uniqueModalKey) {
            //     console.log("OPEN")
            //     openModal()
            // }
        }
        window.addEventListener("popstate", eventListenerPopState)
    }, [modalShown])

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
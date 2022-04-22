import React, { useCallback, useState, useImperativeHandle, forwardRef, use } from "react"

// this is a wrapper component for showing modals to the user one after the other like a carousel
const ModalSequence = forwardRef((props, ref) => {
    const { data, onExitModalSequence, renderModal } = props
    const [modalHistory, setModalHistory] = useState([])
    const [showIndex, setShowIndex] = useState(false)
    const [popStateAnimation, setPopStateAnimation] = useState(false)

    useImperativeHandle(ref, () => ({
        exitModalSequence: exitModalSequence,
        goToNext,
        goToPrevious,
        goToIndex,
        goBackInModalHistory
    }))

    const goToIndex = (index) => {
        setShowIndex(index)
        if (!modalHistory.length) {
            setModalHistory([index])
            window.history.pushState({}, "/")
        } else {
            setShowIndex(index)
            setModalHistory((oldHistory) => [...oldHistory, index])
            window.history.pushState({}, "/")
        }
    }

    // close ALL modals, regardless of modal history
    const exitModalSequence = () => {
        onExitModalSequence && onExitModalSequence()
        setShowIndex(false)
        setModalHistory([])
    }

    // programatically trigger the next modal in the sequence with goToNext
    const goToNext = () => {    
        if (typeof showIndex === "number") {
            goToIndex(showIndex + 1)
        }
    }
    
    // programatically trigger the previous modal in the sequence with goToPrevious
    const goToPrevious = () => {
        if (showIndex) { //not 0
            goToIndex(showIndex - 1)
        }
    }

    const goBackInModalHistory = () => {
        if (modalHistory.length) {
            const newHistory = modalHistory.slice()
            newHistory.pop()
            const newShowIndex = newHistory[newHistory.length - 1]
            setPopStateAnimation(true)
            if (typeof newShowIndex !== "undefined") {
                if (newShowIndex > showIndex) {
                    setShowIndex(newShowIndex)
                    // setModalHistory(newHistory.slice())
                } else if (newShowIndex < showIndex) {
                    setShowIndex(newShowIndex)
                    // setModalHistory(newHistory.slice())
                }
            } else {
                exitModalSequence()
            }

            // set new history after modal animation finishes
            setTimeout(() => {
                setModalHistory(newHistory.slice())
                setPopStateAnimation(false)
            }, 500) // allow user to set duration?
        } else {
            exitModalSequence()
        }
    }

    // on the brownser back button, return the user to the previous modal (or close all modals if there is no previous modal)
    // useEffect(() => {
    //     const eventListenerPopState = () => {
         
    //     }
    //     window.addEventListener("popstate", eventListenerPopState)
  
    //     return () => window.removeEventListener("popstate", eventListenerPopState)
    // }, [showIndex, modalHistory])

    // useEffect(() => {
    //     if (typeof showIndex === "number") {
    //         if (!modalHistory.length) {
    //             exitModalSequence()
    //         }
    //     }
    // }, [showIndex])

    // data should be an array of objects, each object is then mapped to a modal, which is in turn determined by the renderModal prop
    return data.map((datum, index) => {

        const showModal = showIndex === index;
        const prevShowIndex = popStateAnimation ? modalHistory[modalHistory.length - 1] : modalHistory[modalHistory.length - 2];

        const wrapperProps = {
            datum, 
            index, 
            data, 
            goToNext, 
            goToPrevious, 
            exitModalSequence,
            goBackInModalHistory,
            show: showModal, 
            showIndex, 
            prevShowIndex,
            key: index
        }

        // pass our new functionality on, so that user can define their custom component
        // renderModal expects either a function which returns a component, or a component
        if (typeof renderModal === "function") {
            return renderModal(wrapperProps)
        } else {
            const ComponentModal = renderModal;
            return <ComponentModal {...wrapperProps} />
        }
    })
})

export default ModalSequence

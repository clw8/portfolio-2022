import React, { useEffect, useState, useImperativeHandle, forwardRef, use } from "react"
import Fade from 'react-reveal/Fade';

// this is a wrapper component for showing modals to the user one after the other
const ModalSequence = forwardRef((props, ref) => {
    const { data, onExitModalSequence, renderModal } = props
    const [modalHistory, setModalHistory] = useState([])
    const [showIndex, setShowIndex] = useState(false)
    const [popStateAnimation, setPopStateAnimation] = useState(false)

    useImperativeHandle(ref, () => ({
        openSequence: (index = 0) => {
            setShowIndex(index)
        },
        exitModalSequence: exitModalSequence,
        goToNext,
        goToPrevious
    }))

    // close ALL modals, regardless of modal history
    const exitModalSequence = () => {
        onExitModalSequence()
        setShowIndex(false)
        setModalHistory([])
    }

    // programatically trigger the next modal in the sequence with goToNext
    const goToNext = () => {
        setShowIndex(showIndex + 1)
        setModalHistory((oldHistory) => [...oldHistory, showIndex + 1])
        window.history.pushState({}, "/")
    }
    
    // programatically trigger the previous modal in the sequence with goToPrevious
    const goToPrevious = () => {
        setShowIndex(showIndex - 1)
        setModalHistory((oldHistory) => [...oldHistory, showIndex - 1])
        window.history.pushState({}, "/")
    }

    // on the brownser back button, return the user to the previous modal
    useEffect(() => {
        const eventListenerPopState = () => {
            if (modalHistory.length) {
                //TODO: traverse through modal history on back button
                // edit history and transition to modal shown to user before this one
                const newHistory = modalHistory.slice()
                newHistory.pop()
                const newShowIndex = newHistory[newHistory.length - 1]
                console.log(newShowIndex, showIndex)
                setPopStateAnimation(true)
                if (typeof newShowIndex !== "undefined") {
                    if (newShowIndex > showIndex) {
                        // setModalHistory(newHistory)
                        console.log("newShowIndex", newShowIndex)
                        setShowIndex(newShowIndex)
                    } else if (newShowIndex < showIndex) {
                        console.log("newShowIndex", newShowIndex)
                        setShowIndex(newShowIndex)
                        // setModalHistory(newHistory)
                    }
                } else {
                    exitModalSequence()
                }

                setTimeout(() => {
                    // set new history after modal animation finishes
                    setModalHistory(newHistory)
                    setPopStateAnimation(false)
                }, 500) // allow user to set duration?
            }
        }
        window.addEventListener("popstate", eventListenerPopState)
  
        return () => window.removeEventListener("popstate", eventListenerPopState)
    }, [showIndex, modalHistory])

    // data should be an array of objects, each object is then mapped to a modal, which is in turn determined by the renderModal prop
    return data.map((datum, index) => {
        // the user may choose to exit from the whole modal sequence at any point by setting allModals to true
        // if allModals is falsy, then closing a modal returns it the the previously opened modal (if there is one)
        // ...goToPrevious handles this returning to a previous modal, and should be attached to a clickable element
        const goBackToPreviousModal = (allModals) => {
            if (allModals || !modalHistory.length) {
                exitModalSequence()
            }
        }

        const onOpenModal = () => {
            if (!modalHistory.length) {
                setModalHistory([showIndex])
                window.history.pushState({}, "/")
            }
        }

        const showModal = showIndex === index;
        const prevShowIndex = popStateAnimation ? modalHistory[modalHistory.length - 1] : modalHistory[modalHistory.length - 2];

        const wrapperProps = {
            datum, 
            index, 
            data, 
            goToNext, 
            goToPrevious, 
            goBackToPreviousModal, 
            onOpenModal, 
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
// problem changing show causes allModalsClose, which sets the main animatin and the modal index
export default ModalSequence

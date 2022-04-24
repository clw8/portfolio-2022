import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import PropTypes from "prop-types";
import { throttle } from "../utils";

// this is a wrapper component for showing modals to the user one after the other like a carousel
const ModalSequence = forwardRef((props, ref) => {
  const {
    data,
    onExitModalSequence,
    renderModal,
    navigationThrottleMs = 500,
  } = props;
  const modalHistory = useRef([]);

  const [showIndex, setShowIndex] = useState(false);
  // can uncomment this once goBackInModalHistory is in use
  // const popStateAnimation = useRef(false);
  const pushStateOccurred = useRef(false);

  useImperativeHandle(ref, () => ({
    exitModalSequence: exitModalSequence,
    goToNext,
    goToPrevious,
    goToIndex,
  }));

  const goToIndex = (index) => {
    if (!modalHistory.current.length) {
      modalHistory.current = [index];
      window.history.pushState({}, "/");
      pushStateOccurred.current = true;
    } else {
      modalHistory.current = [...modalHistory.current, index];
    }
    setShowIndex(index);
  };

  // close ALL modals, regardless of modal history
  const exitModalSequence = (isPopStateEvent) => {
    modalHistory.current = [];
    onExitModalSequence && onExitModalSequence();
    setShowIndex(false);

    if (pushStateOccurred.current && !isPopStateEvent) {
      pushStateOccurred.current = false;
      window.history.go(-1);
    }
  };

  // programatically trigger the next modal in the sequence with goToNext
  const goToNext = () => {
    if (typeof showIndex === "number") {
      goToIndex(showIndex + 1);
    }
  };

  // programatically trigger the previous modal in the sequence with goToPrevious
  const goToPrevious = () => {
    if (showIndex) {
      //not 0 or false
      goToIndex(showIndex - 1);
    }
  };

  // in order for this to work in conjunction with exiting all the modals at once (using exitModalSequence), 
  // ...we need some way to reset the history (remove all the pushState calls that we did)
  // currrently this is not possible so I've settled with the easier solution of not keeping a history of the last modal that was visited
  // const goBackInModalHistory = () => {
    // if (modalHistory.current.length) {
    //   const newHistory = modalHistory.current.slice();
    //   newHistory.pop();
    //   const newShowIndex = newHistory[newHistory.length - 1];

    //   popStateAnimation.current = true;
    //   if (typeof newShowIndex !== "undefined") {
    //     modalHistory.current = newHistory.slice();
    //     if (newShowIndex > showIndex) {
    //       setShowIndex(newShowIndex);
    //     } else if (newShowIndex < showIndex) {
    //       setShowIndex(newShowIndex);
    //     }
    //   } else {
    //     exitModalSequence();
    //   }

    //   // set new history after modal animation finishes
    //   setTimeout(() => {
    //     popStateAnimation.current = false;
    //   }, navigationThrottleMs);
    // } else {
    //   exitModalSequence();
    // }
    
  // };

  // browser back button functionality and keyboard functionality
  useEffect(() => {
    const keyListener = throttle((e) => {
      if (e.keyCode === 39) {
        // right arrow key
        goToNext();
      } else if (e.keyCode === 37) {
        // left arrow key
        goToPrevious();
      } else if (e.keyCode === 27) {
        // escape key
        exitModalSequence();
      } else if (e.keyCode === 8) {
        // backtab key
        // window.history.back();
        exitModalSequence();
      }
    }, navigationThrottleMs);

    const popstateListener = () => exitModalSequence(true);
    document.addEventListener("keydown", keyListener);
    window.addEventListener("popstate", popstateListener);

    return () => {
      document.removeEventListener("keydown", keyListener);
      window.removeEventListener("popstate", popstateListener);
    };
  }, [showIndex]);

  // data should be an array of objects, each object is then mapped to a modal, which is in turn determined by the renderModal prop
  return data.map((datum, index) => {
    const showModal = showIndex === index;

    // can uncomment this once goBackInModalHistory is in use
    // const prevShowIndex = popStateAnimation.current
    //   ? modalHistory.current[modalHistory.current.length - 1]
    //   : modalHistory.current[modalHistory.current.length - 2];
    const prevShowIndex = modalHistory.current[modalHistory.current.length - 2];

    const wrapperProps = {
      datum,
      index,
      data,
      goToNext,
      goToPrevious,
      exitModalSequence,
      show: showModal,
      showIndex,
      prevShowIndex,
      key: index,
    };

    // pass our new functionality on, so that user can define their custom component
    // renderModal expects either a function which returns a component, or a component
    if (typeof renderModal === "function") {
      return renderModal(wrapperProps);
    } else {
      const ComponentModal = renderModal;
      return <ComponentModal {...wrapperProps} />;
    }
  });
});

export default ModalSequence;

ModalSequence.propTypes = {
  data: PropTypes.array.isRequired,
  onExitModalSequence: PropTypes.func,
  renderModal: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
};

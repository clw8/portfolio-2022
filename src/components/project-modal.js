import React, { useEffect, Fragment, useState } from "react";
// import { useModal } from "../hooks";
import RightArrow from "../images/icons/right-arrow.png";
import CloseIcon from "../images/icons/cancel.png";
import Modal from "./modal.js";

//coupled with modal-sequence component, but with some small changes can be used as a standalone modal
const ProjectModal = (props) => {
  const {
    index,
    datum,
    data,
    goToNext,
    goToPrevious,
    exitModalSequence,
    goBackInModalHistory,
    show,
    prevShowIndex,
    showIndex,
  } = props;
  const lastIndex = data.length - 1;

  const transitionRightIn =
    typeof prevShowIndex === "undefined" || showIndex > prevShowIndex;
  const transitionRightOut =
    typeof prevShowIndex === "undefined" || showIndex <= prevShowIndex;

    const animations = {
    in: transitionRightIn ? "in-right" : "in-left",
    inEnd: transitionRightIn ? "in-right-end" : "in-left-end",
    out: transitionRightOut ? "out-right" : "out-left",
    outEnd: transitionRightOut ? "out-right-end" : "out-left-end",
  };

  const onCloseIconClick = () => {
    exitModalSequence && exitModalSequence();
  };
  const onRightArrowClick = () => {
    goToNext && goToNext();
  };

  const onLeftArrowClick = () => {
    goToPrevious && goToPrevious();
  };

  useEffect(() => {
    // preload image
    let img = new Image();
    img.src = datum.modalImage;
  }, []);

  const onClose = (event) => {
    // if there is an event, we know we want to go back in the sequence history
    if (event) {
      goBackInModalHistory()
    }
  }

  return (
    <Modal
      animations={animations}
      style={{ background: datum.background }}
      show={show}
      onClose={onClose}
    >
      <Fragment>
        <div className="project-modal__close" onClick={onCloseIconClick} aria-label="Close Modal">
          <img src={CloseIcon} alt="Close Modal"/>
        </div>
        <div className="modal__content">
          <div className="modal__text">
            <h2 className="project-modal__header">{datum.header}</h2>
          </div>
          <img
            className="project-modal__image"
            style={datum.modalImageStyle}
            src={datum.modalImage}
            alt="Image of the project"
          />
          <div className="modal__text">{datum.detail_html}</div>
        </div>

        {index < lastIndex && (
          <img
            className="project-modal__arrow project-modal__arrow--right"
            src={RightArrow}
            onClick={onRightArrowClick}
            alt="Right Arrow (go to next modal)"
            aria-label="Next Project"
          />
        )}

        {index > 0 && (
          <img
            className="project-modal__arrow project-modal__arrow--left"
            src={RightArrow}
            onClick={onLeftArrowClick}
            alt="Left Arrow (go to previous modal)"
            aria-label="Previous Project"
          />
        )}
      </Fragment>
    </Modal>
  );
};

export default ProjectModal;

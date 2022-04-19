import React, { useEffect, Fragment, useState } from "react";
// import { useModal } from "../hooks";
import RightArrow from "../images/icons/right-arrow.png";
import CloseIcon from "../images/icons/cancel.png";
import Modal from "./modal.js";

const ProjectModal = (props) => {
  const {
    index,
    datum,
    data,
    goToNext,
    goToPrevious,
    onClose,
    onOpen,
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
    onClose && onClose(true);
  };
  const onRightArrowClick = () => {
    goToNext && goToNext();
  };

  const onLeftArrowClick = () => {
    goToPrevious && goToPrevious();
  };

  useEffect(() => {
    if (show) {
      onOpen && onOpen();
    } else {
      onClose && onClose();
    }
  }, [show]);

  useEffect(() => {
    // preload image
    let img = new Image();
    img.src = datum.modalImage;
  }, []);

  return (
    <Modal
      animations={animations}
      style={{ background: datum.background }}
      show={show}
      usePopState={false}
    >
      <Fragment>
        <div className="project-modal__close" onClick={onCloseIconClick}>
          <img src={CloseIcon} />
        </div>
        <div className="modal__content">
          <div className="modal__text">
            <h2 className="project-modal__header">{datum.header}</h2>
          </div>
          <img
            className="project-modal__image"
            style={datum.modalImageStyle}
            src={datum.modalImage}
          />
          <div className="modal__text">{datum.detail_html}</div>
        </div>

        {index < lastIndex && (
          <img
            className="project-modal__arrow project-modal__arrow--right"
            src={RightArrow}
            onClick={onRightArrowClick}
          />
        )}

        {index > 0 && (
          <img
            className="project-modal__arrow project-modal__arrow--left"
            src={RightArrow}
            onClick={onLeftArrowClick}
          />
        )}
      </Fragment>
    </Modal>
  );
};

export default ProjectModal;

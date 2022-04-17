import React, { useEffect, Fragment, useState } from "react"
import { useModal } from "../hooks";
import RightArrow from "../images/icons/right-arrow.png"
import CloseIcon from "../images/icons/cancel.png"

const ProjectModal = (props) => {
    const {modalIndex, showIndex, lastIndex, datum, onClose, onRightArrow, onLeftArrow} = props
    const [prevShowIndex, setPrevShowIndex] = useState(showIndex)
    const [projectModal, projectModalShown, openProjectModal, closeProjectModal] = useModal(false, { style: {background: datum.background}, onClose })

    useEffect(() => {

      if(!projectModalShown && prevShowIndex !== showIndex && showIndex === modalIndex) {
        if(showIndex !== false) {
          const transitionRight = prevShowIndex !== false && showIndex < prevShowIndex
          openProjectModal(false, transitionRight, (
            <Fragment>
              <div className="project-modal__close"  onClick={onCloseClick}>
                  <img src={CloseIcon} />
              </div>
              <div className="modal__content">
                <div className="modal__text">
                <h2 className="project-modal__header">{datum.header}</h2>
              </div>
              <img className="project-modal__image" style={datum.modalImageStyle} src={datum.modalImage}/>
                <div className="modal__text">
                  {datum.detail_html}
                </div>
              </div>
              
              {modalIndex < lastIndex && (
                <img className="project-modal__arrow project-modal__arrow--right" src={RightArrow} onClick={onRightArrowClick}/>
              )}

              {modalIndex > 0 && (
                <img className="project-modal__arrow project-modal__arrow--left" src={RightArrow} onClick={onLeftArrowClick}/>
              )}
              
            </Fragment>
          ))
        }
      }
      
      setPrevShowIndex(showIndex)
  }, [prevShowIndex, showIndex, projectModalShown])

  useEffect(() => {
      // preload image
      let img = new Image()
      img.src = datum.modalImage;
  }, [])

  const onCloseClick = () => {
    onClose()
    closeProjectModal()
  }

  const onRightArrowClick = () => {
    onRightArrow()
    closeProjectModal(false, true);
  }

  const onLeftArrowClick = () => {
    onLeftArrow()
    closeProjectModal(false, false);
  }



  return projectModal
}

export default ProjectModal

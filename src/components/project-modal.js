import React, { useEffect, Fragment, useState } from "react"
import Fade from 'react-reveal/Fade';
import { useModal } from "../hooks";


const ProjectModal = (props) => {
    const {show, datum, onClose} = props
    const [prevShow, setPrevShow] = useState(show)
    const [projectModal, projectModalShown, openProjectModal, closeProjectModal] = useModal(() => (
      <Fragment>
        <div className="modal__content">
         <div className="modal__text">
          <h2 className="project-modal__header">{datum.header}</h2>
         </div>
        <img className="project-modal__image" src={datum.modalImage}/>
          <div className="modal__text">
            {datum.detail_html}
          </div>
        </div>
      </Fragment>
    ), { style: {background: datum.background}, onClose })

    useEffect(() => {
        if(prevShow !== show ) {
          if(show && !projectModalShown) {
            openProjectModal()
          }
        }
        
        setPrevShow(show)
    }, [prevShow, show, projectModalShown])

  return projectModal
}

export default ProjectModal

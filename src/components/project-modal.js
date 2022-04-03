import React, { useEffect, Fragment } from "react"
import Fade from 'react-reveal/Fade';
import { useModal } from "../hooks";


const ProjectModal = (props) => {
    const {show, datum} = props
    const [projectModal, projectModalShown, toggleProjectModal] = useModal(() => (
        <Fragment>
        <h2>{datum.header}</h2>
        {datum.detail_html}
      </Fragment>
    ))

    useEffect(() => {
        if(show && !projectModalShown) {
            toggleProjectModal()
        } else if(!show && projectModalShown) {
            toggleProjectModal()
        }
    }, [show])

  return projectModal
  
}

export default ProjectModal

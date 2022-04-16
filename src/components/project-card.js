import * as React from "react"
import Fade from 'react-reveal/Fade';


const ProjectCard = (props) => {
  const { datum, onClick } = props

  return (
    <Fade bottom cascade distance={"20px"} duration={2000}>
      <div className="project-card" onClick={onClick}>
        <div className="project-card__top">
          {datum.tag === "video" && (
            <video muted loop autoPlay src={datum.image} type="video/webm" />
            )}
          {datum.tag === "img" && (
            <img src={datum.image} />
            )}
        </div>
        <div className="project-card__bottom" style={datum.bottomTextStyle}>
          <h4>{datum.header}</h4>
          <p>{datum.text}</p>
        </div>
      </div>
    </Fade>
  )
}

export default ProjectCard

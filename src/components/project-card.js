import * as React from "react";
import Fade from "react-reveal/Fade";
import PropTypes from "prop-types";

const ProjectCard = (props) => {
  const { datum, onClick } = props;

  return (
    <Fade bottom cascade distance={"20px"} duration={2000}>
      <article
        className="project-card"
        onClick={onClick}
        aria-description="Project card"
      >
        <div className="project-card__top">
          {datum.tag === "video" && (
            <video
              muted
              loop
              autoPlay
              src={datum.image}
              type="video/mp4"
              alt="Short GIF of project"
            />
          )}
          {datum.tag === "img" && <img src={datum.image} alt="Project image" />}
        </div>
        <div className="project-card__bottom" style={datum.bottomTextStyle}>
          <h4 aria-description="Project name">{datum.header}</h4>
          <p aria-description="Project description">{datum.text}</p>
        </div>
      </article>
    </Fade>
  );
};

export default ProjectCard;

ProjectCard.propTypes = {
  datum: PropTypes.object,
  onClick: PropTypes.func
};

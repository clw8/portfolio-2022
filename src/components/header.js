import * as React from "react"
import ProfileImage from "../images/main-image.jpeg"
import Fade from 'react-reveal/Fade';
import ChrisResumePDF from "../images/Christopher_Walsh_CV.pdf";
import { useScrollTo } from "../hooks";


const Header = (props) => {
  const { onMouseEnter, onMouseOut, show } = props
  const { onClickHashScrollTo } = useScrollTo()
  
  return (
    <Fade duration={2000} delay={1200} when={show}>
      <header>
          <div className="profile-image">
              <img src={ProfileImage} 
                    onMouseEnter={() => onMouseEnter("profile")} 
                    width="100"
                    height="100"
                    alt="A picture of clw8, the developer of this portfolio site :)"
                    onMouseOut={onMouseOut}/>
            </div>
        <nav>
          <a href="#projects" 
            onClick={onClickHashScrollTo}
            onMouseEnter={(event) => onMouseEnter(event.target.hash)} 
            onMouseOut={onMouseOut}>Projects</a>
          <a href={ChrisResumePDF}
          onMouseEnter={(event) => onMouseEnter("resume")} 
          onMouseOut={onMouseOut}>Resume</a>
          <a href="#contact"
            onClick={onClickHashScrollTo}
            onMouseEnter={(event) => onMouseEnter(event.target.hash)} 
            onMouseOut={onMouseOut}>Contact</a>
        </nav>
      </header>
    </Fade>
  )
}

export default Header

import * as React from "react"
// import { Link } from "gatsby"
import ProfileImage from "../images/main-image.jpeg"
import Fade from 'react-reveal/Fade';

const Header = (props) => {
  const { onHover, onMouseOut, onClick } = props

  return (
    <Fade duration={2000} delay={1200}>
      <header>
          <div className="profile-image">
              <img src={ProfileImage} 
                    onMouseEnter={() => onHover("profile")} 
                    width="100"
                    height="100"
                    onMouseOut={onMouseOut}/>
            </div>
        <nav>
          {/* <a href="/" 
            onClick={onClick}
            onMouseEnter={onHover} 
            onMouseOut={onMouseOut}>Home</a> */}
          <a href="#projects" 
            onClick={onClick}
            onMouseEnter={(event) => onHover(event.target.hash)} 
            onMouseOut={onMouseOut}>Projects</a>
          <a href="#contact"
            onClick={onClick}
            onMouseEnter={(event) => onHover(event.target.hash)} 
            onMouseOut={onMouseOut}>Contact</a>
        </nav>
      </header>
    </Fade>
  )
}

export default Header

import React, { useRef, useEffect, Fragment} from "react";
import Typed from 'typed.js';
//import MainLayout from "../layouts/main-layout"

import projectData from "../data/project-data"
import JedAdanFooterImage from "../images/jed-adan-footer.jpg";
import ChrisResumePDF from "../images/Christopher_Walsh_CV.pdf";
import Fade from 'react-reveal/Fade';
import { ProjectCard } from "../components"
import { useScrollTo, useModal } from "../hooks";

// todo seo and favicon


const IndexPage = ({ children, show }) => {
  const { onClickHashScrollTo } = useScrollTo()
  const [projectModal, projectModalShown, toggleProjectModal] = useModal(() => "")
  const [contentShown, setContentShown] = React.useState(true)
  const [initialContentAnimationPlayState, setInitialContentAnimationPlayState] = React.useState(false) // children must be a function

  const typedRef = useRef(null)

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      // strings: ["Welcome."],
      stringsElement: '#typed-strings', // Strings to display
      // Speed settings, try diffrent values untill you get good results
      startDelay: 300,
      typeSpeed: 60,
      showCursor: false,
      contentType: "null",
    });
  }, [])

  const pageContentClass = `wrapper__inner ${contentShown ? (initialContentAnimationPlayState ? 'wrapper__inner__enter' : "") : 'wrapper__inner__leave'}`

  const preventScroll = () => {
    document.body.style.overflow = "hidden"
  }

  const onProjectCardClick = (datum) => {
    toggleProjectModal(
      () => (
        <Fragment>
          <h2>{datum.header}</h2>
          <div dangerouslySetInnerHTML={{__html : datum.detail_html}}></div>
        </Fragment>
      )
    )

    setContentShown(false)
    preventScroll()
    !initialContentAnimationPlayState && setInitialContentAnimationPlayState(true)
  }

  return (
    <Fragment>

        <main className={pageContentClass}>
          <div className="content">
            <div id="typed-strings">
              <h1>Welcome.</h1>
            </div>
            <div className="h1-container">
              <span ref={typedRef}></span>
            </div>
            <Fade bottom distance={"20px"} duration={2000} delay={1600}>
              <div className="content__above-fold">
                
                <div className="content__section content__section--border">
                
                    <h2>My name is Chris and I have problems.</h2>
                    <p>I approach problem-solving with as much patience as possible! While it's always great to instantly find the fix for a bug via Stack Overflow, there are times when that approach doesn't cut it. </p>
                    <p>It's during those times, I've found that patience with myself and others really is a virtue. And after much (oddly calm) head scratching, I'll usually find the solution to the problem with dogged persistence and perhaps some creative ingenuity.</p>
                    <p>When I work on a project, I'll also try first to understand the bigger picture, and how the nitty-gritty details all fit in; not only to provide a great UI/UX but also to provide overall value to the business' product offering and keep customers coming back.</p>
                    <p>If this sounds like someone you want to work with, please <a href="#contact" onClick={onClickHashScrollTo}>get in touch</a>. Currently, I'm looking for work in London, so if I've just contacted you or applied to your company, I'd love to talk with you over a (remote?) cup of coffee.</p>
                </div>
              
                <br />

                <div className="content__flex">

                  <p className="scroll-p">Scroll down</p>
                  <a href="#projects"
                    onClick={onClickHashScrollTo}>       
                    <svg width="15"  aria-hidden="true" focusable="false" data-prefix="fal" data-icon="arrow-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M443.5 248.5l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L241 419.9V44c0-6.6-5.4-12-12-12h-10c-6.6 0-12 5.4-12 12v375.9L28.5 241.4c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.8 4.8-12.3.1-17z"></path></svg>
                  </a>
                  </div>
              </div>
              </Fade>

              <div className="content__section" id="projects">
                <Fade bottom distance={"20px"} duration={2000}>
                  <h2>Projects that I'm proud to have contributed to.</h2>
                </Fade>
                <div className="project-card__container">
                  {projectData.map((datum, index) => (
                    <ProjectCard datum={datum} 
                                 key={index}
                                 onClick={() => onProjectCardClick(datum)}></ProjectCard>
                  ))}
                </div>
              </div>
            
            <Fade bottom cascade distance={"20px"} duration={2000} when={show}>

              <div className="content__section" id="contact">
                <h2>Get in contact</h2>
                <p>Let's discuss what you need and what I can offer. Please find my resume <a href={ChrisResumePDF}>here</a>.</p>
                <p>And get in contact with me <a href="mail@clw8.com">here</a>.</p>
                <br></br>
                <div className="icon-container__flex">
                  <a href="https://github.com/clw8" target="_blank">
                    <svg className="icon-flex" viewBox="0 0 24 24" fill="#0b1f33cc" width="1.25rem" height="1.25rem"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
                  </a>
                  <a href="https://www.linkedin.com/in/christopher-walsh-1a2446132/" target="_blank">
                    <svg className="icon-flex" viewBox="0 0 24 24" fill="#0b1f33cc" width="1.25rem" height="1.25rem"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
                  </a>
                </div>

              <p></p>
              </div>
            </Fade>
          </div>

            <img src={JedAdanFooterImage} className="footer-image" />
                        
        </main>

        {projectModal}
    </Fragment>
  )
}

export default IndexPage

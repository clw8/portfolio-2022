import React, { useRef, useEffect, Fragment, useState} from "react";
import Typed from 'typed.js';
//import MainLayout from "../layouts/main-layout"

import projectData from "../data/project-data"
import JedAdanFooterImage from "../images/jed-adan-footer.jpg";
import ChrisResumePDF from "../images/Christopher_Walsh_CV.pdf";
import Fade from 'react-reveal/Fade';
import { ProjectCard, ProjectModal, ModalSequence, ContactFormModal } from "../components"
import { useScrollTo } from "../hooks";
import { useScrollRestoration } from "gatsby"


const IndexPage = ({ createTyped }) => {
  const { onClickHashScrollTo } = useScrollTo()
  const [animation, setAnimation] = React.useState(3)
  const pageScrollRestoration = useScrollRestoration("index-page");
  const modalSequenceRef = useRef()
  const typedRef = useRef(null)
  const [showContactFormModal, setShowContactFormModal] = useState(false)

  useEffect(() => {
    new Typed(typedRef.current, {
      // strings: ["Welcome.", "clw8.dev"],
      stringsElement: '#typed-strings', // Strings to display
      // Speed settings, try diffrent values untill you get good results
      startDelay: 500,
      typeSpeed: 75,
      showCursor: false,
      contentType: "null",
    });
  }, [])

  const onProjectCardClick = (index) => {
    setAnimation(1)
    modalSequenceRef.current.openSequence(index)
    //!initialContentAnimationPlayState && setInitialContentAnimationPlayState(true)
    // setCurrentModalIndex(index)
  }

  const onExitModalSequence = () => {
    setAnimation(0)
    // setCurrentModalIndex(false)
  }

  //const projectModalShown = currentModalIndex !== false
  //const pageContentClass = `wrapper__inner ${!projectModalShown ? (initialContentAnimationPlayState ? 'wrapper__inner__enter' : "") : 'wrapper__inner__leave'}`

  const onAnimationEnd = (e) => {
    if(e.target.className === "wrapper__inner") {
        if (animation === 0) setAnimation(3)
        else if (animation === 1) setAnimation(4)
    }
  }

  const closeContactForm = () => setShowContactFormModal(false)
  
  const openContactForm = (event) => {
    event.preventDefault()
    setShowContactFormModal(true)
  }

  return (
    <Fragment>

        <main className="wrapper__inner" animation={animation} onAnimationEnd={onAnimationEnd} {...pageScrollRestoration}>
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
                    <p>When I work on a project, I'll also try first to understand the bigger picture, and how the nitty-gritty details all fit in; not only to provide a great UI/UX but also to holistically provide value to the business' product offering and keep customers coming back.</p>
                    <p>If this sounds like someone you want to work with, please <a href="#contact" onClick={openContactForm}>get in touch</a>. Currently, I'm looking for work in London, so if I've just contacted you or applied to your company, I'd love to talk with you over a (remote?) cup of coffee.</p>
                </div>

                <div className="content__flex">
                  <a href="#projects"
                  className="scroll-p"
                    onClick={onClickHashScrollTo}>       
                    <p >Scroll down</p>
                    <svg width="15"  aria-hidden="true" focusable="false" data-prefix="fal" data-icon="arrow-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M443.5 248.5l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L241 419.9V44c0-6.6-5.4-12-12-12h-10c-6.6 0-12 5.4-12 12v375.9L28.5 241.4c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.8 4.8-12.3.1-17z"></path></svg>
                  </a>
                </div>
              </div>
            </Fade>

              <div className="content__section content__section--border" id="projects">
                <Fade bottom distance={"20px"} duration={2000}>
                  <h2>Projects that I'm proud to have contributed to.</h2>
                </Fade>
                <div className="project-card__container">
                  {projectData.map((datum, index) => (
                    <ProjectCard datum={datum} 
                                 key={index}
                                 onClick={() => onProjectCardClick(index)} />
                  ))}
                </div>
              </div>
            
            <Fade bottom cascade distance={"20px"} duration={2000} >

              <div className="content__section" id="contact">
                <h2>Get in contact</h2>
                <p>Let's discuss what you need and what I can offer. Please find my resume <a href={ChrisResumePDF} onMouseEnter={() => createTyped("resume")} onMouseLeave={() => createTyped("")}>here</a>.</p>
                <p>And get in contact with me <a href="#" onClick={openContactForm} onMouseEnter={() => createTyped("mail")} onMouseLeave={() => createTyped("")}>here</a>.</p>
                <br></br>
                <div className="icon-container__flex">
                  {/* Github icon */}
                  <a className="icon-flex" href="https://github.com/clw8" target="_blank" rel="noreferrer">
                    <svg viewBox="0 0 24 24" fill="#0b1f33cc" width="1.3rem" height="1.3rem"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
                  </a>
                    {/* Linkedin icon */}
                  <a className="icon-flex" href="https://www.linkedin.com/in/christopher-walsh-1a2446132/" target="_blank" rel="noreferrer">
                    <svg viewBox="0 0 24 24" fill="#0b1f33cc" width="1.25rem" height="1.25rem"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
                  </a>
                  {/* Codepen icon */}
                  <a className="icon-flex icon-flex__codepen" href="https://codepen.io/clw8" target="_blank" rel="noreferrer">
                    <svg enableBackground="new 0 0 128 128"  version="1.1" viewBox="0 0 128 128" width="1.45rem" height="1.45rem">
                      <ellipse cx="64" cy="64" rx="64" ry="64" fill="#0b1f33cc"/>
                      <g transform="matrix(0.7, 0, 0, 0.7, 19.2, 19.2)">
                        <path fill="#fff" clipRule="evenodd" d="M117,73.204L103.24,64L117,54.796V73.204z M69.5,112.22V86.568L93.348,70.62l19.248,12.872L69.5,112.22z M64,77.012L44.548,64L64,50.988L83.456,64L64,77.012z M58.5,112.22    L15.404,83.492L34.656,70.62L58.5,86.568V112.22z M11,54.796L24.764,64L11,73.204V54.796z M58.5,15.78v25.652L34.656,57.384    L15.404,44.508L58.5,15.78z M69.5,15.78l43.096,28.728L93.348,57.384L69.5,41.432V15.78z M127.952,43.784    c-0.012-0.084-0.032-0.16-0.044-0.24c-0.028-0.156-0.056-0.312-0.096-0.46c-0.024-0.092-0.06-0.18-0.088-0.268    c-0.044-0.136-0.088-0.268-0.14-0.4c-0.036-0.092-0.08-0.184-0.124-0.268c-0.056-0.128-0.116-0.248-0.188-0.364    c-0.048-0.088-0.104-0.172-0.156-0.256c-0.072-0.116-0.148-0.228-0.232-0.336c-0.06-0.08-0.124-0.16-0.188-0.236    c-0.088-0.104-0.18-0.204-0.276-0.3c-0.072-0.072-0.14-0.148-0.216-0.212c-0.104-0.092-0.208-0.18-0.312-0.264    c-0.084-0.064-0.164-0.128-0.248-0.188c-0.032-0.02-0.06-0.048-0.092-0.068l-58.5-39c-1.848-1.232-4.252-1.232-6.104,0l-58.496,39    c-0.032,0.02-0.06,0.048-0.092,0.068c-0.088,0.06-0.168,0.124-0.248,0.188C2.004,40.264,1.9,40.352,1.8,40.444    c-0.076,0.064-0.148,0.14-0.22,0.212c-0.096,0.096-0.188,0.196-0.272,0.3c-0.068,0.076-0.132,0.156-0.192,0.236    c-0.08,0.108-0.156,0.22-0.228,0.336c-0.056,0.084-0.108,0.168-0.16,0.256C0.66,41.9,0.6,42.02,0.54,42.148    c-0.04,0.084-0.084,0.176-0.12,0.268c-0.056,0.132-0.1,0.264-0.144,0.4c-0.028,0.088-0.06,0.176-0.084,0.268    c-0.04,0.148-0.068,0.304-0.096,0.46c-0.016,0.08-0.036,0.156-0.044,0.24C0.02,44.016,0,44.256,0,44.5v39    c0,0.24,0.02,0.48,0.052,0.72c0.008,0.076,0.028,0.156,0.044,0.236c0.028,0.156,0.056,0.308,0.096,0.46    c0.024,0.092,0.056,0.18,0.084,0.268c0.044,0.132,0.088,0.268,0.144,0.404c0.036,0.088,0.08,0.176,0.12,0.264    c0.06,0.124,0.12,0.244,0.188,0.368c0.052,0.084,0.104,0.168,0.16,0.252c0.072,0.116,0.148,0.224,0.228,0.332    c0.06,0.084,0.124,0.164,0.192,0.24c0.084,0.1,0.176,0.204,0.272,0.296c0.072,0.076,0.144,0.148,0.22,0.216    c0.1,0.092,0.204,0.18,0.312,0.264c0.08,0.064,0.16,0.128,0.248,0.188c0.032,0.02,0.06,0.048,0.092,0.068l58.496,39    C61.872,127.692,62.936,128,64,128s2.128-0.308,3.052-0.924l58.5-39c0.032-0.02,0.06-0.048,0.092-0.068    c0.084-0.06,0.164-0.124,0.248-0.188c0.104-0.084,0.208-0.172,0.312-0.264c0.076-0.068,0.144-0.14,0.216-0.216    c0.096-0.092,0.188-0.196,0.276-0.296c0.064-0.076,0.128-0.156,0.188-0.24c0.084-0.108,0.16-0.216,0.232-0.332    c0.052-0.084,0.108-0.168,0.156-0.252c0.072-0.124,0.132-0.244,0.188-0.368c0.044-0.088,0.088-0.176,0.124-0.264    c0.052-0.136,0.096-0.272,0.14-0.404c0.028-0.088,0.064-0.176,0.088-0.268c0.04-0.152,0.068-0.304,0.096-0.46    c0.012-0.08,0.032-0.16,0.044-0.236c0.032-0.24,0.048-0.48,0.048-0.72v-39C128,44.256,127.984,44.016,127.952,43.784z" />
                      </g>
                    </svg>
                  </a>
                </div>

              </div>
            </Fade>
          </div>


            <img src={JedAdanFooterImage} className="footer-image" />
                        
        </main>

        <ContactFormModal show={showContactFormModal} 
                              onNavigateBack={closeContactForm} 
                              onClose={closeContactForm}/>

        {/* Project cards */}
        <ModalSequence
          ref={modalSequenceRef}
          onExitModalSequence={onExitModalSequence}
          data={projectData}
          renderModal={
            (props) => {
              return (
                <ProjectModal 
                  {...props}
                />
            )}
          }
        />

    </Fragment>
  )
}

export default IndexPage

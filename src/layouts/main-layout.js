import React, { useEffect, useRef, useState } from "react"
import { Header, Loader } from "../components"
import Typed from 'typed.js';
import ProfileImage from "../images/main-image.jpeg"
import {Helmet} from "react-helmet"
import { throttle } from "../utils";
import Fade from 'react-reveal/Fade';
import ToastProvider from "../context-providers/toast-provider";

import * as Favicons from "../images/favicons"

const typedJsStrings = {
  home: "",
  "profile": "All about this guy.",
  "#projects": "Here's what I've created.",
  "#contact": "Fancy a chat?",
  "resume": 'Two pages of supernatural expressive force saying "HIRE ME!"',
  "mail": "Email me... I'll be nice."
}

const preloadImages = []
let preloadedImagesCount = 0

const MainLayout = (props) => {
  const {children} = props;
  const [typedJsString, setTypedJsString] = useState(null)
  const [showPageFirstLoad, setShowPageFirstLoad] = useState(false)
  const [showScrollIcon, setShowScrollIcon] = useState(false)
  const typedRef = useRef(null)

  const createTyped = (pageName, delay = 0) => {
      if( typedJsString ) {
        typedJsString.destroy()
      }
      if( typedJsStrings[pageName] ) {
        const typed = new Typed(typedRef.current, {
          strings: [typedJsStrings[pageName]], // Strings to display
          // Speed settings, try diffrent values untill you get good results
          startDelay: 0,
          typeSpeed: 30,
          showCursor: true,
          fadeOut: true,
        });
    
        setTypedJsString(typed)
      }
  }

  const onLinkMouseOut = (event) => {
      createTyped("home")
  }

  const handleLoad = () => {
    if (preloadedImagesCount === preloadImages.length) {
      setShowPageFirstLoad(true)
    
      //document.body.style.overflow = "auto";
    }
  }

  useEffect(() => {
    // doing this in a new useEffect so that body--no-scroll doesn't reappear on hot reload
    if(showPageFirstLoad) {
      setTimeout(() => {
        document.body.classList.remove("body--no-scroll")

        window.onbeforeunload = function () {
          window.scrollTo(0, 0);
        }
      }, 1800)
    }
  }, [showPageFirstLoad])

  useEffect(() => {
    // initial typed effect on "Welcome"
    createTyped("home", 500)

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad, false);
    }

    // load the profile pic in the header first before showing the content
    const profilePicImage = new Image
    profilePicImage.src = ProfileImage
    preloadImages.push(profilePicImage)

    preloadImages.forEach(image => {
      if(image.complete) preloadedImagesCount++
      else image.onload = () => preloadedImagesCount++
    })

    // show scroll up icon on scroll past the hero area
    const scrollPastHeight = window.innerHeight / 3 * 2
    const scrollHandler = throttle(() => {
       const showScrollIconNewValue = window.scrollY > scrollPastHeight
       if (showScrollIcon !== showScrollIconNewValue) {
         setShowScrollIcon(showScrollIconNewValue)
       }
    }, 200)
    document.addEventListener("scroll", scrollHandler, {passive: true})
    
    // Destropying
    return () => {
      typedJsString && typedJsString.destroy();
      window.removeEventListener('load', handleLoad);
      document.removeEventListener("scroll", scrollHandler, {passive: true})
    };
  }, []);


  const childrenWithProps = React.Children.map(children, child => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { createTyped, show: showPageFirstLoad });
    }
    return child;
  });

  const onClickScrollTop = () => {
    document.body.scrollIntoView({ behaviour: "smooth" })
  }

  return (
      <div className="wrapper" >
        <Helmet bodyAttributes={{ class: "body body--no-scroll"}}>
          <title>Chris' Portfolio</title>
          <meta name="description" content="Front-end web developer or something- clw8's web portfolio. "></meta>
          <link rel="apple-touch-icon" sizes="180x180" href={Favicons.AppleTouchIcon} />
          <link rel="icon" type="image/png" sizes="32x32" href={Favicons.Favicon32x32} />
          <link rel="icon" type="image/png" sizes="16x16" href={Favicons.Favicon16x16} />
          {/* <link rel="manifest" href="images/site.webmanifest" />
          <link rel="mask-icon" href="images/safari-pinned-tab.svg" color="#5bbad5" /> */}
          <link rel="shortcut icon" href={Favicons.FaviconIco} />
          {/* <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="msapplication-config" content="images/browserconfig.xml" />
          <meta name="theme-color" content="#ffffff" /> */}
        </Helmet>
        <Header onMouseEnter={createTyped} onMouseOut={onLinkMouseOut} show={showPageFirstLoad} />

        <ToastProvider>
          {showPageFirstLoad && childrenWithProps}
        </ToastProvider>

        <p ref={typedRef} className="sync-text"></p>

        {/* scroll up arrow */}
        <Fade bottom distance={"20px"} duration={1000} when={showScrollIcon}>
          <div className="icon icon__scroll-top" onClick={onClickScrollTop}> 
            <svg width="15"  aria-hidden="true" focusable="false" data-prefix="fal" data-icon="arrow-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M443.5 248.5l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L241 419.9V44c0-6.6-5.4-12-12-12h-10c-6.6 0-12 5.4-12 12v375.9L28.5 241.4c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.8 4.8-12.3.1-17z"></path></svg>
          </div>
        </Fade>

        <Loader show={!showPageFirstLoad}></Loader>
      </div>
  )
}

export default MainLayout

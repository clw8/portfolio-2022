import React, { useEffect, useRef, useState } from "react"
import { Header, Loader } from "../components"
import Typed from 'typed.js';
import ProfileImage from "../images/main-image.jpeg"
import {Helmet} from "react-helmet"

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

  useEffect(() => {
    if(props.location.uri === "/") {
      
    }
  }, [props.location.uri])

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
      }, 1800)
    }
  }, [showPageFirstLoad])

  useEffect(() => {
    createTyped("home", 500)

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad, false);
    }

    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }

    const profilePicImage = new Image
    profilePicImage.src = ProfileImage
    preloadImages.push(profilePicImage)

    preloadImages.forEach(image => {
      if(image.complete) preloadedImagesCount++
      else image.onload = () => preloadedImagesCount++
    })
    
    // Destropying
    return () => {
      typedJsString && typedJsString.destroy();
      window.removeEventListener('load', handleLoad);
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

  return (
      <div className="wrapper" >
        <Helmet bodyAttributes={{ class: "body body--no-scroll"}}>
          <title>Chris' Portfolio</title>
          <meta name="description" content="Front-end web developer or something- clw8's web portfolio. "></meta>
        </Helmet>
        <Header onHover={createTyped}
                onMouseOut={onLinkMouseOut}
                show={showPageFirstLoad} />
          {showPageFirstLoad && childrenWithProps}
        <p ref={typedRef} className="sync-text"></p>
        <Loader show={!showPageFirstLoad}></Loader>
      </div>
  )
}

export default MainLayout

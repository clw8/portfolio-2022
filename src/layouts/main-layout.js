import React, { useEffect, useRef, useState } from "react"
import { Header, Loader } from "../components"
import Typed from 'typed.js';
import ProfileImage from "../images/main-image.jpeg"
import Reveal from "react-reveal"
import { useModalTransition } from "../hooks";

const typedJsStrings = {
  home: "",
  "profile": "All about this guy.",
  "#projects": "Here's what I've done.",
  "#contact": "Fancy a chat?",
  "resume": "My CV for your perusal."
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

  const onLinkMouseOut = (event) => {
      createTyped("home")
  }

  const handleLoad = () => {
    if (preloadedImagesCount === preloadImages.length) {
      setShowPageFirstLoad(true)
    }
  }

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
      <div className="wrapper">
        <Header onHover={createTyped}
                onMouseOut={onLinkMouseOut}
                show={showPageFirstLoad} />
          {/* {childrenWithProps} */}
        <p ref={typedRef} className="sync-text"></p>
        <Loader show={!showPageFirstLoad}></Loader>
      </div>
  )
}

export default MainLayout

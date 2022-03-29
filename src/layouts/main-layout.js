import React, { useEffect, useRef, useState } from "react"
import { Header, Loader } from "../components"
import Typed from 'typed.js';
import ProfileImage from "../images/main-image.jpeg"

const typedJsStrings = {
  home: "",
  "profile": "All about this guy.",
  "#projects": "Here's what I've done.",
  "#contact": "Fancy a chat?"
}

const preloadImages = []
let preloadedImagesCount = 0

const MainLayout = (props) => {
  const {children, location} = props;
  const [typedJsString, setTypedJsString] = useState(null)
  const [currentPage, setCurrentPage] = useState("home")
  const [showPage, setShowPage] = useState(false)
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

  const onClickHashScrollTo = (event) => {
    event.preventDefault();
    let hash = event.target.hash
    console.log(hash, event.target)
    setCurrentPage(hash)
    if (hash === "/") {
      document.body.scrollIntoView(true);
    } else {
      document.querySelector(hash).scrollIntoView({block:"start", behavior:"smooth"})
    }
    
  }

  const onLinkMouseOut = (event) => {
      createTyped("home")
  }

  const handleLoad = () => {
    if (preloadedImagesCount === preloadImages.length) {
      setShowPage(true)
    }
  }

  const checkPreloadedImages = () => {
    
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
      return React.cloneElement(child, { onClickHashScrollTo, createTyped, show: showPage });
    }
    return child;
  });


  return (
    <React.Fragment>
      <main>
        <Header onHover={createTyped} 
                onMouseOut={onLinkMouseOut}
                onClick={onClickHashScrollTo}
                currentPage={currentPage}
                show={showPage} />
          {childrenWithProps}
        <p ref={typedRef} className="sync-text"></p>
      </main>
      <Loader show={!showPage}></Loader>
    </React.Fragment>
  )
  
}

export default MainLayout

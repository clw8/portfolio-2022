import React, { useEffect, useRef, useState } from "react"
import { Header, Loader } from "../components"
import Typed from 'typed.js';

const typedJsStrings = {
  home: "",
  "profile": "All about this guy.",
  "#projects": "Here's what I've done.",
  "#contact": "Fancy a chat?"
}

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

  const onClickHeaderLink = (event) => {
    event.preventDefault();
    let hash = event.target.hash
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
    setShowPage(true)
  }

  useEffect(() => {
    createTyped("home", 500)

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad, false);
    }
    
    // Destropying
    return () => {
      typedJsString.destroy();
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <React.Fragment>
      <main>
        <Header onHover={createTyped} 
                onMouseOut={onLinkMouseOut}
                onClick={onClickHeaderLink}
                currentPage={currentPage} />
          {children}
        <p ref={typedRef} className="sync-text"></p>
      </main>
      <Loader show={!showPage}></Loader>
    </React.Fragment>
  )
  
}

export default MainLayout

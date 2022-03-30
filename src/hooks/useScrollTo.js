import React, { useState } from "react";

const useScrollTo = () => {

    const onClickHashScrollTo = (event) => {
        event.preventDefault();
        let hash = event.target.hash

        if (hash === "/") {
          document.body.scrollIntoView(true);
        } else {
          document.querySelector(hash).scrollIntoView({block:"start", behavior:"smooth"})
        }
        
      }

      return {
          onClickHashScrollTo,
      }
}

export default useScrollTo
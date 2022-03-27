import * as React from "react"


const Loader = (props) => {
  const {show} =props
  return (
    <div className={`loader ${!show ? "loaded" : ""}`}>
       <p>
         Loading...
         </p> 
    </div>
  )
}

export default Loader

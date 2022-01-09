import React from 'react'
import './Loading.css'

const Loading = () => {
   return (
      <>
         <div className="container-fluid" id="load_container">
            <div id="loader">
               <div id="load_shadow"></div>
               <div id="load_box"></div>
            </div>
         </div>
      </>
   )
}

export default Loading

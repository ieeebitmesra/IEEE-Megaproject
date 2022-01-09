import React from "react"
 
import { useState } from "react";



const Homepage = ({updateUser}) => {

    return (
        
        <div className="homepage">
            <h1>Hello  {JSON.parse(localStorage.getItem("MyUser")).name}, this is the Homepage   </h1>
            {/* <div>{n}</div> */}
            <div className="button" onClick={() => updateUser({})} >Logout</div>
        </div>
    )
}

export default Homepage
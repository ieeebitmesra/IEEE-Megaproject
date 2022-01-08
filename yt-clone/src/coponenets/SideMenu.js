import React, { useState } from 'react'
import "./ComponentCss/sidemenu.css";
import { Link } from 'react-router-dom';
import { auth } from '../Firebase';
import { onAuthStateChanged, signOut } from '@firebase/auth';
export const SideMenu = () => {
const[isSignedOut,setIsSignedOut]=useState(false);
onAuthStateChanged(auth,(user)=>{
  if(user){
    setIsSignedOut(false)
  }
  else{
    setIsSignedOut(true)
  }
})
  const logOut=()=>{
    signOut(auth);

alert("signed Out")

  }
  const SidemenuAccountHandler=()=>{
    if(isSignedOut){
      return(<>
      <Link to="/signup" >  <li style={{color:'white',cursor:'pointer'}}  className="link-dark rounded"  >New...</li></Link>
      <Link to="/signin" >  <li style={{color:'white',cursor:'pointer'}} className="link-dark rounded" >SignIn</li></Link>
      
      </>)
    }
    else{
      return(<>
       <li className="link-dark rounded" style={{color:'white',cursor:'pointer'}} onClick={logOut}>Sign out</li>
      </>)
    }
  }
  
    
    return (
        <div>
        <div className="flex-shrink-0 p-3  bg-dark " id="sidemenu"  style={{width:'20vw' }}>
   
    <ul className="list-unstyled ps-0">
      <li className="mb-1">
        <Link to='/'>
        <button className="btn btn-toggle sidemenu-butt align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
        <i className="fas fa-home"/> <span className='sidemenuText'>Home</span>  
        </button>
        </Link>
        
      </li>
      <li className="mb-1">
        <Link to="/explorefeed">
        <button className="btn btn-toggle sidemenu-butt align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
        <i className="fas fa-compass"/> <span className='sidemenuText'>Explore</span> 
        </button>
        </Link>
       
      </li>
      <li className="mb-1">
        <Link to="/subscriptions">
        <button className="btn btn-toggle sidemenu-butt align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
        <i className="fas fa-plus-square"/><span className='sidemenuText'> Subscription</span> 
        </button>
        </Link>
        
      </li>
      <li className="border-top my-3"></li>
      <li className="mb-1">
        <button className="btn btn-toggle sidemenu-butt align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
        <i className="fas fa-user-alt"/> <span className='sidemenuText'>Account</span>
        </button>
        <div className="collapse" id="account-collapse"  >
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
         
           <SidemenuAccountHandler/>
           
          </ul>
        </div>
      </li>
    </ul>
  </div>
  
        </div>
    )
}

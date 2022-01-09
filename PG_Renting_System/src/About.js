import react from "react";
import { useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import defaultProfile from "./images/defaultProf.png";
const About = () => {
  return (
    <div className="aboutA">
      <div className="aboutContent">
        <div className="teams">
        <strong><h1 className="teamsHeading"> Meet our Team </h1></strong>

          <div className="memberInfo">
            <div className="memberPic">
             <img src={defaultProfile} alt="Not found"  />

            </div>

            <div className="memberText">
              <h3>Manav Bansal</h3>

              <p>Team Leader</p>

              <p>Email : manav.bansal.hsr@gmail.com</p>

              <p>LinkedIn : manav@123 </p>
            </div>
          </div>
          <div className="memberInfo">
            <div className="memberPic">
            <img src={defaultProfile} alt="Not found"  />
            </div>

            <div className="memberText">
              <h3>Siddarth Banerjee</h3>

              <p>Member</p>

              <p>Email : siddarth2801@gmail.com</p>

              <p>LinkedIn : sidbit2801 </p>
            </div>
          </div>
          <div className="memberInfo">
            <div className="memberPic">
            <img src={defaultProfile} alt="Not found"  />
            </div>

            <div className="memberText">
              <h3>Srijan Kumar</h3>

              <p>Member</p>

              <p>Email : srijanrathor8@gmail.com</p>

              <p>LinkedIn : srijan@108 </p>
            </div>
          </div>
        </div>
        <div className="aboutNavbar">
<div className="blankSpace">

</div>
          <div className="vertNav">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/login">Login/Signup</Link>
          <a href="https://www.linkedin.com/in/siddarth-banerjee-163101202">Contact Us</a>

          </div>


       
       
        </div>
      </div>

      <div className="aboutMargin"></div>
    </div>
  );
};

export default About;

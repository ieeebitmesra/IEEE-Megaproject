import React from 'react';
import {useEffect,useState} from 'react';

import "./about.css";
import Award from "../../img/award.png";
import Interview from "../../img/interview.png"
import whiteboard from "../../img/whiteboard.png"
import chat from "../../img/chat.png"
import problemset from "../../img/problemset.png"
import IDE from "../../img/IDE.png"
import google from "../../img/google.png"
import agora from "../../img/agora.png"
import white from "../../img/white.jpg"
import chatLogo from '../../img/chatlogo.jpg'
import problemLogo from '../../img/problemLogo.jpg'

const About = (props) => {
  const [image,setImage] = useState({});
  const [logo,setLogo] = useState({});
  const [title,setTitle] = useState("Title");
  const [aboutContent,setContent] = useState("Content");
  useEffect(() => {
    setLogo(Award);
    if(props.currImg === 1){
      setImage(Interview);
      setLogo(agora);
      setTitle("Seamless 1:1 audio and video interview experience");
      setContent("AgoraRTC powered audio-video  interface for low latency connections");
      
    }
    if(props.currImg === 2){
      setImage(whiteboard);
      setLogo(white);
      setTitle("Collaborative whiteboard to share your thoughts");
      setContent("Real-time drawing and sharing with space whiteboard");
    }
    if(props.currImg === 3){
      setImage(chat);
      setLogo(chatLogo);
      setTitle("Share your professional handles and links with space chat");
      setContent("Want to share something use space chat")
    }
    if(props.currImg === 4){
      setImage(problemset);
      setLogo(problemLogo);
      setTitle("Practice with our problemset and be interview ready");
      setContent("Easy-Hard, implementation-dp we have it all")
    }
    if(props.currImg === 5){
      setImage(IDE);
      setLogo(google);
      setTitle("Code and test it with intergrated IDE and Judge ");
      setContent("GCP powered IDE and online Judge")
    }
  })
  if(props.position === 1){
    return (
      <div className="a mt-5 mb-5">
        <div className="a-left">
          <div className="a-card bg"></div>
          <div className="a-card">
            <img
              src={image}
              alt=""
              className="a-img"
            />
          </div>
        </div>
        <div className="a-right">
          <h1 className="a-title">{title}</h1>
          <p className="a-sub">
            {aboutContent}
          </p>
         
          <div className="a-award">
            <img src={logo} alt="" className="a-award-img" />
            
          </div>
        </div>
      </div>
    );
  }else{
    return (
      <div className="a mt-5 mb-5" >
        
        <div className="a-right">
          <h1 className="a-title">{title}</h1>
          <p className="a-sub">
           {aboutContent}
          </p>
          
          <div className="a-award">
            <img src={logo} alt="" className="a-award-img" />
            
          </div>
        </div>
        <div className="a-left">
          <div className="a-card bg"></div>
          <div className="a-card">
            <img
              src={image}
              alt=""
              className="a-img"
            />
          </div>
        </div>
      </div>
    );
  }
};

export default About;

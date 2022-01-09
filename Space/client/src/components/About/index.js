import React, { useRef } from "react";
import "./styles.css";
import { Controller, Scene } from "react-scrollmagic";
import Sequence from "./Sequence";
import { useEffect } from "react";
import { ThemeProvider } from "./context";
import App from './App.jsx';

const About = () => {
  const ref = useRef();
  // const text = document.querySelector("#about-logo");
  const scroll = (x)=>{
    if(x>1400){
      window.scrollTo(0,2135);
      return;
    }
    window.scrollTo(0, x);
      // eslint-disable-next-line
      let scrollDelay = setTimeout(()=>{scroll(x+5)},70);
  }
  
  useEffect(() => {
    
    scroll(0);  
     
  })
  return (
    <div className="App">
      <Controller>
        <Scene duration="200%" triggerHook="onLeave" pin>
          {progress => (
            <div id = "sequence" style={{ height: "100vh", position: "relative" }}>
              
              <Sequence ref={ref} progress={progress}  />
            </div>
          )}
        </Scene>
      </Controller>
      <ThemeProvider>
      <App />
    </ThemeProvider>
     
     
        
    </div>
  );
};

export default About

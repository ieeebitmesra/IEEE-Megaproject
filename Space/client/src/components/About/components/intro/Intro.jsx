import "./intro.css";
import Me from "../../img/me.gif";

const Intro = () => {
  return (
    <div className="i">
      <div className="i-left">
        <div className="i-left-wrapper">
          <h2 className="i-intro">Turning your dreams to reality</h2>
          <h1 className="i-name">Space</h1>
          
          <p className="i-desc my-3">
            Space is a platform that gives you ability to conduct real one-to-one interviews with low latency collaborative whiteboard and IDE with real time chat.
            It also powers you with the ability to practice problems and code it right in here with our google cloud powered IDE. 
          </p>
          <div className="i-title d-flex justify-content-center m-2">
            <div className="i-title-wrapper">
              <div className="i-title-item">Interview</div>
              <div className="i-title-item">Problems</div>
              <div className="i-title-item">Puzzles</div>
              <div className="i-title-item">IDE</div>
              <div className="i-title-item">Progress Tracker</div>
            </div>
          </div>
          <a href = "/login" className = "mt-2"><button className="btn btn-primary about-btn">Get Started</button></a>
        </div>
        
      </div>
      <div className="i-right">
        <div className="i-bg">
        <img src={Me} alt="" className="i-img" />
        </div>
        
      </div>
    </div>
  );
};

export default Intro;

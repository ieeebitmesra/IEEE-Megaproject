import authCB from "./images/authCB.jpg";
import locationCB from "./images/locationCB.jpg";
import chatCB from "./images/chatCB.jpg";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="services">
      <div className="mainServices">
        <div className="blankServices"></div>

        <div className="mainMS">
          <div className="headAndNav">
            <div className="MShead">
              <h1 className="mainMSH">It's so easy</h1>
              <br />
              <p className="mainMSC">
                This website has many features that can make your PG search as
                well as selling simpler and easier. We know how important a safe
                home is to you at both ends of the deal and that is a promise we
                make.
              </p>
            </div>

            <div className="msNav">
              <Link to= "/"> <p>Home</p></Link>
              <br />
              <Link to="/about"><p>About Us</p></Link>    
              <br />
              <Link to="/login"><p>Login/SignUp</p></Link>
              <br />
              <a href="https://www.linkedin.com/in/siddarth-banerjee-163101202"><p>Contacts</p></a>
            </div>
          </div>

          <div className="cardArea">
            <div className="feature">
              <div className="featureIcon">
                <img src={locationCB} className="filterIcon" />
              </div>

              <h3 className="featureHeading">Filter System</h3>

              <p>
              Through the filter system of this website, you can define your search according to some facilities that you want in your PG.

              </p>
            </div>
            <div className="feature">
              <div className="featureIcon">
                <img src={chatCB}   className="filterIcon"   height={92} className="chatICON" />
              </div>

              <h3 className="featureHeading">Bookmarks</h3>

              <p>You can bookmark all the PGs in which you are interested and inquire about them afterwards. These will be visible in the profile section  </p>
            </div>
            <div className="feature">
              {" "}
              <div className="featureIcon">
                <img src={authCB} />
              </div>
              <h3 className="featureHeading">Email Authentication</h3>
              <p>
                Verify your identity with the help of email authentication
                which will help you with a better experience on the website.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rightServices"></div>
    </div>
  );
};

export default Services;

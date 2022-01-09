import "./contact.css";
import Phone from "../../img/phone.png";
import Email from "../../img/email.png";
import Address from "../../img/address.png";
import { useContext, useRef, useState } from "react";
import { ThemeContext } from "../../context";
import axios from 'axios'

const Contact = () => {
  const formRef = useRef();
  const [done, setDone] = useState(false)
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const [feedback, setFeedback] = useState({
    name: "",
    subject: "",
    email: "",
    message: "",
  })


  const handleCchange = e => {
    const { name, value } = e.target
    setFeedback({
      ...feedback,
      [name]: value
    })
    console.log(feedback);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, subject, email, message } = feedback;
    if (name && subject && email && message) {
      axios.post(`${process.env.REACT_APP_SERVER_URL}/feedback`, feedback)
        .then(res => {
          if (res.data.done === 1)
            setDone(true);
        })
    }
  };

  return (
    <div className="c mt-5">
      <div className="c-wrapper">
        <div className="c-left">
          {/* <h1 className="">Our Team</h1> */}
          <h1 className="pl-title">Contact Us</h1>
          <div className="c-info ms-5">
            <div className="c-info-item">
              <img src={Phone} alt="" className="c-icon" />
              +91 6376 819 421
            </div>
            <div className="c-info-item">
              <img className="c-icon" src={Email} alt="" />
              <a style={{ textDecoration: 'none' }} href="mailto: team.space.793@gmail.com">team.space.793@gmail.com</a>
            </div>
            <div className="c-info-item">
              <img className="c-icon" src={Address} alt="" />
              BIT Mesra, Ranchi, India
            </div>
          </div>
        </div>
        <div className="c-right">
          <form ref={formRef} className="mt-5">
            <input style={{ backgroundColor: darkMode && "#333" }} value={feedback.name} type="text" placeholder="Name" name="name" onChange={handleCchange} /><br />
            <input style={{ backgroundColor: darkMode && "#333" }} value={feedback.subject} type="text" placeholder="Subject" name="subject" onChange={handleCchange} /><br />
            <input style={{ backgroundColor: darkMode && "#333" }} value={feedback.email} type="text" placeholder="Email" name="email" onChange={handleCchange} />
            <textarea style={{ backgroundColor: darkMode && "#333" }} value={feedback.message} rows="5" placeholder="Message" name="message" onChange={handleCchange} />
            <button className="mb-5" onClick={handleSubmit}>Submit</button>
            {done ? <>
              <br />
              <h6>Thanks for the feedback</h6>
            </> : <></>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

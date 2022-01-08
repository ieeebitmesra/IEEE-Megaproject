import React,{useState, useEffect} from 'react'
import {
  Modal, ModalHeader, ModalBody
} from "reactstrap"
import { Link } from 'react-router-dom'
import Particles from 'react-tsparticles'
import patriclesConfig from './config/particle-config'
import './Interview.css'
import './Form.css'
import schedule from './schedule.svg'
import join from './join.svg'
import firebaseOrdersCollection from '../Firebase/firebase'
import * as emailjs from 'emailjs-com'


const SIZE = 10;

const Interview = (props) => {

  const [modal, setModal] = useState(false);
  const [IRname, setIRName] = useState(" ");
  const [IEname, setIEName] = useState(" ");
  const [IRmail, setIRmail] = useState(" ");
  const [IEmail, setIEmail] = useState(" ");
  const [DateTime, setDateTime] = useState();
  const [user,setUser] = useState(props.user);
  useEffect(() => {
    if (localStorage.getItem('userMain')) {
      let u = JSON.parse(localStorage.getItem('userMain'));
      setUser(u);
    }
    document.title = 'Interview | Space';
    // eslint-disable-next-line
  }, []);

 
  const toggle = () => {
    setModal(!modal);
  }

  const randomize = (len) => {
    console.log("geting key");
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvxyz";
    var key = '';
    var charsLen = chars.length;
    for (var i = 0; i < len; i++)
      key += chars.charAt(Math.floor(Math.random() * charsLen));
    return key;
  }

  const SendMail = () => { 
    // console.log("sending mail");
    var randKey = randomize(SIZE);
    var details = {
      Interviewer_Name: IRname,
      Interviewee_Name: IEname,
      Interviewer_Email: IRmail,
      Interviewee_Email: IEmail,
      Date_Time: DateTime,
      Key: randKey,
    };

    firebaseOrdersCollection.child(randKey).set(details);

    sendToIE(randKey + 'IE');
    sendToIR(randKey + 'IR');
    document.getElementById("schedule-submit-btn").innerHTML = `Sent`;

    setInterval(() => setModal(!modal), 2000);
  }

  const sendToIR = (randKey) => {
    let IRparam = {
      to_name: IRname,
      to_email: IRmail,
      ie_name: IEname,
      date: DateTime.split('T')[0],
      time: DateTime.split('T')[1],
      room_id: randKey
    }
    emailjs.send(process.env.REACT_APP_SERVICE_KEY, process.env.REACT_APP_IR_KEY, IRparam, process.env.REACT_APP_USER_KEY);
    // console.log("IR");
    setIRName('');
    setIRmail('');
    setDateTime('');
  }

  const sendToIE = (randKey) => {
    let IEparam = {
      to_name: IEname,
      to_email: IEmail,
      date: DateTime.split('T')[0],
      time: DateTime.split('T')[1],
      room_id: randKey
    }
    emailjs.send(process.env.REACT_APP_SERVICE_KEY, process.env.REACT_APP_IE_KEY, IEparam, process.env.REACT_APP_USER_KEY);
    // console.log("IE");
    setIEName('');
    setIEmail('');
  }

  const subForm = (e) => {
    e.preventDefault();
    // console.log(IRname + IEname + IRmail + IEmail + DateTime);
    document.getElementById("schedule-submit-btn").innerHTML = `Sending`;
    SendMail();
  }

  const newTab = () => {
    window.open(`https://space-dun-one.vercel.app/join`, "_blank");
  }


  return (
    <>
      <div className="interview">
        <Particles
          params={patriclesConfig} />
        <div className="main_content" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '50px', fontWeight: 'lighter', color: '#263238' }}>Space Helps You</h1>
          <h2 style={{ fontSize: '50px', fontWeight: 'bold', color: '#263238' }}>Improve Your Skills</h2>
        </div>
        <div className="bottom_boxx" style={{ textAlign: 'center' }}>
          <div className="imgContainer mt-5">
            <img src={schedule} alt="Interview" className='imgg' />
            <h6>...</h6>
            <button type="button" onClick={toggle}  style={{ "fontSize": "18px" }} className="btn btn-dark my-4">Schedule</button>
          </div>
          <div className="imgContainer pull mt-5">
            <img src={join} alt="Problem" className='imgg' />
            <h6>...</h6>
            <Link to="/interview"><button type="button" onClick={newTab} style={{ "fontSize": "18px" }} className="btn btn-dark my-4">Join</button></Link>
          </div>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle} className="modal-80w" centered >
        <ModalHeader
          toggle={toggle} className="modal-cen" centered >Schedule an interview</ModalHeader>
          <ModalBody className='modal-col' centered>
          <form id="schedule-form">
            <div className="modal-body">
              <div className="row">
                <fieldset className="col-xs-12 col-sm-6 col-md-6">
                  <legend>
                    <h6 style={{ "textAlign": "center" }}>Interviewer Details</h6>
                  </legend>
                  <div className="input-area my-4" style={{ "textAlign": "center" }}>
                    <input className='modal-in' type="text" onChange={(e) => setIRName(e.target.value)} autoComplete="off" placeholder="NAME" data-form-field="Name" id="IRname"  required />
                    <label className="label-name"></label>
                  </div>
                  <div className="input-area my-4" style={{ "textAlign": "center" }}>
                    <input className='modal-in' type="email" onChange={(e) => setIRmail(e.target.value)} autoComplete="off" placeholder="EMAIL" data-form-field="Email" id="IRmail" required />
                    <label className="label-name"></label>
                  </div>
                </fieldset>
                <fieldset className="col-xs-12 col-md-6">
                  <legend>
                    <h6 style={{ "textAlign":"center"}}>Interviewee Details</h6>
                  </legend>
                  <div className="input-area my-4" style={{ "textAlign": "center" }}>
                    <input className='modal-in' type="text" onChange={(e) => setIEName(e.target.value)} autoComplete="off" placeholder="NAME" data-form-field="Name" id="IEname" required />
                    <label className="label-name"></label>
                  </div>
                  <div className="input-area my-4" style={{ "textAlign": "center" }}>
                    <input className='modal-in' type="email" onChange={(e) => setIEmail(e.target.value)} autoComplete="off" placeholder="EMAIL" data-form-field="Email" id="IEmail" required />
                    <label className="label-name"></label>
                  </div>
                </fieldset>
              </div>
              <div className="row flex-column align-items-center my-3" style={{ "textAlign": "center" }}>
                <fieldset className="col-md-6 col-sm-6">
                  <legend>
                    <h6>Date and Time</h6>
                  </legend>
                  <div className="input-area" style={{ "textAlign": "center" }}>
                    <input type="datetime-local" onChange={(e) => setDateTime(e.target.value)} autoComplete="off" data-form-field="date-time" id="date-time" required />
                    <label className="label-name"></label>
                  </div>
                  <div className="modal-footer border-top-0 d-flex justify-content-center" style={{"marginBottom":"-10px"}}>
                    <button className="btn submit-btn btn-dark" onClick={subForm} type="submit" id="schedule-submit-btn" >Submit</button>
                  </div>
                </fieldset>
              </div>
            </div>
          </form>
        </ModalBody>
        {/* <ModalFooter className="modal-cen">
          <div style={{ "margin": "auto" }}>
            <Button color="dark" onClick={toggle}>Close</Button>
          </div>
        </ModalFooter> */}
        </Modal>
      <style jsx global>{`
      .modal-80w {
        width: 70vw;
        max-width: none !important;
      }
      `}
      </style>
    </>
  )
}

export default Interview

import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable';
import { useNavigate } from 'react-router-dom';
import './Room.css'
import Unauthorized from '../unauthorized/Unauthorized';
import Github from '../RoomComp/Github/Github'
import Ide from '../ide/Ide'
import { UseUtils } from '../utils/roomUtils';
import { useClient } from "../VideoCall/settings.js";
import { AgoraVideoPlayer } from "agora-rtc-react";
import placeholder from "../../assets/images/user.png"

import {
   Modal, ModalHeader, ModalBody, Button, ModalFooter
} from "reactstrap"






const Room = (props) => {
   const client = useClient();
   const { setInterview } = props;
   const {setStart, setInCall } = props;
   const { show_video, show_chat, show_board, show_code, show_git } = UseUtils();
   setInterview(false);
   const { users, tracks } = props;
   
   const navigate = useNavigate();
   
   const [modal, setModal] = useState(false);
   const [modalw, setModalW] = useState(false);
   const [trackState, setTrackState] = useState({ video: JSON.parse(localStorage.getItem('video')), audio: JSON.parse(window.localStorage.getItem('audio')) });
   var username = window.localStorage.getItem('Name');
   var roomid = window.localStorage.getItem('ID');
   
   const [user,setUser] = useState(props.user);
   const [micr, setMicr] = useState(JSON.parse(window.localStorage.getItem('audio')));
   const [camr, setCamr] = useState(JSON.parse(localStorage.getItem('video')));

   

   useEffect(() => {
      if (localStorage.getItem('userMain')) {
         let u = JSON.parse(localStorage.getItem('userMain'));
         setUser(u);
       }
      if (window.localStorage.getItem('Type') === 'IE') {
         toggle();
      }
      
     
     
      
      
      document.title = 'Room | Space'
      
      window.addEventListener('beforeunload', onUnload);
      // eslint-disable-next-line
   }, []);
   
   const onUnload = () => {
      navigate("/join");
   };

   const toggle = () => {
      setModal(!modal);
   }
   
   const togglew = () => {
      setModalW(!modalw);
   }

   var elem = document.documentElement;

   const fullScreen = () => {
      if (elem.requestFullscreen) {
         elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
         elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
         elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
         elem.msRequestFullscreen();
      }
   }

   if (window.localStorage.getItem('Type') === 'IE') {
      document.addEventListener('fullscreenchange', exitHandler);
      document.addEventListener('webkitfullscreenchange', exitHandler);
      document.addEventListener('mozfullscreenchange', exitHandler);
      document.addEventListener('MSFullscreenChange', exitHandler);

      function exitHandler() {
         if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            togglew();
         }
      }
   }

   const toggleCamera = async () => {
      console.log(trackState);
      console.log("trackVid",!trackState.video);
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
      setCamr(!camr);
   }

   const toggleMic = async () => {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
      setMicr(!micr);
   }

   const hangUpRe = async () => {
      await client.leave();
      client.removeAllListeners();
      tracks[0].close();
      tracks[1].close();
      setStart(false);
      setInCall(false);
      window.close();
   }
   const place = (length)=>{
      console.log(length);
      if(length === 0){
         return <img src = {placeholder} height="150px" width="150px"style = {{"position": "absolute","top":"50%","left":"50%","transform": "translate(-50%,-50%)"}}></img>
      }else{
         return null;
      }
   }

   if (user === undefined) {
      return (
         <Unauthorized />
      )
   }
   else {
   
      user._id = username;
      return (
         <>
            <div className="sidebar">
               <button onClick={show_video} data-toggle="tooltip" data-placement="right" title="Dashboard">
                  <i className="fas fa-desktop fa-2x"></i></button>
               <button onClick={show_chat} data-toggle="tooltip" data-placement="right" title="Chat">
                  <i className="fas fa-comment fa-2x"></i></button >
               <button onClick={show_board} data-toggle="tooltip" data-placement="right" title="Whiteboard">
                  <i className="fas fa-edit fa-2x"></i></button>
               <button onClick={show_code} data-toggle="tooltip" data-placement="right" title="Compiler">
                  <i className="fas fa-code fa-2x"></i></button>
               <button onClick={show_git} data-toggle="tooltip" data-placement="right" title="GitHub">
                  <i className="fab fa-github fa-2x"></i></button >
               {/* <button onClick={show_cf} data-toggle="tooltip" data-placement="right" title="Codeforces">
                  <i className="fas fa-chart-bar fa-2x"></i></button> */}
            </div>

            <div className="content_space">
               <div className="room row">
                  <div className="col-md-12 col-sm-12 video" id="video_space">
                     <div className="video">
                        <div>
                           <span id="currentRoom"></span>
                        </div>
                        <div id="videos">
                           {place(users.length)}
                           {users.length > 0 &&
                              users.map((user) => {
                                 
                                 if (user.videoTrack) {
                                 return (
                                       <div id = "remote_Video">
                                          
                                          <AgoraVideoPlayer
                                          videoTrack={user.videoTrack}
                                          key={user.uid}
                                          style={{height: '100%', width: '100%'}}
                                          />
                                       </div>
                                    
                                 );
                                 } 
                           })}
                           <Draggable bounds="parent" grid={[25, 25]} >
                              <div id = "local_Video">
                                 
                                 <AgoraVideoPlayer videoTrack={tracks[1]} style={{height: '100%', width: '100%',borderRadius:'25px'}} />
                              </div>
                           </Draggable>
                        </div>
                     </div>
                  </div>
                  <div className="col-md-12 col-sm-12 d-none" id="chat_space" >
                     <div className="container-fluid" id='chattt' style={{ 'height': '100vh' }} >
                        <iframe src={`https://chat-with-space.herokuapp.com/?username=${username}&room=${roomid}`} title='chat_s' id="chat_s" loading="eager" frameborder="0" allowfullscreen style={{ 'height': '99vh', 'width': '96vw' }} ></iframe>
                     </div>
                  </div>
                  <div className="col-md-12 col-sm-12  d-none" id="board_space">
                     <div className="container-fluid">
                        <embed src={`https://white-board-client.vercel.app/${roomid}`} id="board_s" style={{ 'height': '99vh', 'width': '96vw' }}></embed>
                     </div>
                  </div>
                  <div className="col-md-12 col-sm-12  d-none" id="code_space">
                     <div className="container-fluid">
                        <Ide user={user} inInterview = {true} />
                     </div>
                  </div>
                  <div className="col-md-12 col-sm-12 d-none" id="git_space">
                     <div className="container-fluid" >
                        <Github />
                     </div>
                  </div>
               </div>
            </div>

            <div className="footer row " id="setting_space">
               <div className="my-auto">
                  <button id="toggleCamera" onClick={toggleCamera}>
                     <i id="toggleCameraIcon" className={camr ? "fa fa-video" : "fa fa-video-slash"} aria-hidden="true"></i>
                  </button>
               </div>
               <div className="my-auto">
                  <button id="toggleMic" onClick={toggleMic}>
                     <i id="toggleMicIcon" className={micr ? "fa fa-microphone" : "fa fa-microphone-slash"} aria-hidden="true"></i>
                  </button>
               </div>
               <div className="my-auto">
                  <button id="hangupBtn" onClick={hangUpRe}>
                     <i className="fa fa-phone" aria-hidden="true"></i>
                  </button>
               </div>
            </div>

            <Modal isOpen={modal} toggle={toggle} className="modals" >
               <ModalHeader
                  toggle={toggle} className="modal-cen" >Important Instructions</ModalHeader>
               <ModalBody className='modal-col'>
                  <p> You would be entering the full screen mode for this meeting.</p>
                  <p className="text-warning"><small>If you don't agree to go full screen, you can't continue using the meeting features.</small></p>
                  {/* <p className="text-info"><small><strong>Note:</strong> Whenever you try exiting the fullscreen mode in-between the meeting, the interviewer would be notified. You will only be exiting the full screen mode after your interview is finished.</small></p> */}
               </ModalBody>
               <ModalFooter className="modal-cen">
                  <div style={{ "margin": "auto" }}>
                     <Button color="dark" onClick={() => { toggle(); fullScreen(); }}>Open Full Screen</Button>
                  </div>
               </ModalFooter>
            </Modal>

            <Modal isOpen={modalw} toggle={togglew} className="modalw" >
               <ModalHeader
                  toggle={togglew} className="modal-cen" >Warning</ModalHeader>
               <ModalBody className='modal-col'>
                  <p> You have exited the full screen mode.</p>
                  <p className="text-warning"><small><strong>Note:</strong> Whenever you try exiting the fullscreen mode in-between the meeting, the interviewer would be notified</small></p>
               </ModalBody>
               <ModalFooter className="modal-cen">
                  <div style={{ "margin": "auto" }}>
                     <Button color="dark" onClick={() => { togglew(); fullScreen(); }}>Open Full Screen</Button>
                  </div>
               </ModalFooter>
            </Modal>
         </>
      )
   }
}

export default Room

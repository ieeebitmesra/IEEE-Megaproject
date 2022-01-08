


import React, { useState, useRef, useEffect } from 'react';
//import { Navbar } from './Navbar';
// import video from "../videos/Myvideo.mp4"
import "./ComponentCss/videoplayer.css";
//import { Playpause } from './Playpause';
import { useParams } from 'react-router';
import { doc, getDoc, collection, updateDoc } from '@firebase/firestore';
import { db } from '../Firebase';
export const VideoPlayer = () => {
    const [progress, SetProgress] = useState(-1)
    const player = useRef(null);
    const vidRef = useRef(null);
    const input = useRef(null);
    const { videoId }: { videoId: string } = useParams();
    const videoRef = doc(db, 'videos', videoId);
    const [videoData, SetVideoData] = useState({});
    const [currenttime, SetCurrentTime] = useState(0.0);
    const [durationtime, SetDuration] = useState(0.0);
    const [views, SetViews] = useState(0)

    useEffect(() => {
        SetProgress(-1)
        const getVideos = async () => {
            const tempvid = await getDoc(videoRef)
                .then((vid) => {
                    updateDoc(doc(db, 'videos', videoId), { views: vid.data().views + 1 }); updateDoc(doc(db, `channels/${vid.data().channelId}/videos`, videoId), { views: vid.data().views + 1 });
                    SetVideoData(vid.data())
                });



        }

        getVideos()
    }, [videoId])




    // console.log(videoData.vidUrl)

    const [playing, setPlaying] = useState(true);
    const handleplayPause = () => {
        if (playing) {
            vidRef.current.pause();
            setPlaying(false);
            console.log("pause")


        } else {
            console.log("playing")
            vidRef.current.play();
            setPlaying(true);

        }

    }
    const timeUpdate = () => {
console.log(progress)
        vidRef.current.addEventListener('timeupdate', () => {
            SetCurrentTime(vidRef.current.currentTime);
            SetDuration(vidRef.current.duration);
            SetProgress((vidRef.current.currentTime / vidRef.current.duration) * 100)
           let instprogress=((vidRef.current.currentTime / vidRef.current.duration) * 100);

            input.current.value = instprogress;

        })
       
        //changing time through seekbaar
        input.current.addEventListener('change', () => {
            vidRef.current.currentTime = (input.current.value * vidRef.current.duration) / 100;
        })
    }


    function openFullscreen() {
        if (vidRef.current.requestFullscreen) {
            vidRef.current.requestFullscreen();
        } else if (vidRef.current.webkitRequestFullscreen) { /* Safari */
            vidRef.current.webkitRequestFullscreen();
        } else if (vidRef.current.msRequestFullscreen) { /* IE11 */
            vidRef.current.msRequestFullscreen();
        }
    }
    const OnLoad = () => {
        if ((progress == -1)) {
            console.log(progress)
            return (
                <div className='Loading'>
                    <div className="spinner-grow text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow text-secondary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow text-success" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow text-danger" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow text-warning" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow text-info" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow text-dark" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )
        }
        else {
            return (<></>)
        }


    }


    return (<>
        <div className="videoOpenpage">




            <div className="vidContainer" ref={player} onClick={handleplayPause} onDoubleClick={openFullscreen}>

                <OnLoad />
                <video style={progress==100?{filter:'brightness(0.5)'}:{}} src={videoData.vidUrl} autoPlay onPlaying={timeUpdate} controlsList='nodownload' ref={vidRef} className="video"></video>
               {
                   progress==100?<>
                   
                <div className="onEnd ">
                <i className="fas fa-redo-alt" style={{cursor:'pointer'}} onClick={()=>{vidRef.current.play()}}></i>
                </div>
                   </>:
                <div className="controls">
                  
                    <div className="timebar_container">
                        <input type="range" ref={input} className="timebar" min="0" max="100" />
                        <div style={{display:'flex',width:'96%',justifyContent:'space-between'}}>
                            <span style={{display:'flex',marginLeft:'-1rem'}}>

                        <div className="playPause" id="playPause" onClick={handleplayPause} >
                        {
                            (playing) ? (
                                <i className="far fa-2x fa-pause-circle" id="masterplay" ></i>
                                ) : (
                                    <i className="far fa-2x fa-play-circle" id="masterplay" ></i>
                                    )
                                }



                    </div>
                        <div className="timestampsofvideo" style={{alignSelf:'center'}}>
                            {
                                (Math.floor(currenttime / 60) + ':' + (Math.floor(currenttime % 60) < 10 ? ('0' + Math.floor(currenttime % 60)) : Math.floor(currenttime % 60)) + '/' + (Math.floor(durationtime / 60) + ':' + (Math.floor(durationtime % 60) < 10 ? ('0' + Math.floor(durationtime % 60)) : Math.floor(durationtime % 60)))
                                
                                )}
                        </div>
                                </span>
                        <div className="fullScreen">

                        <i className="fas fa-expand fullscreenIcon" onClick={openFullscreen}></i>
                    </div>
                        </div>
                    </div>
                    
                </div>

               }
            





            </div>
        </div>
    </>
    )
}

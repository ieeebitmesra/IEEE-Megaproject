import React, { useState,useEffect } from 'react'
import './ComponentCss/channelNav.css';
import { Avatar } from './Avatar';
import { Link } from 'react-router-dom';
import logo from '../images/logoyt.png';
import { useParams } from 'react-router';
import { doc,getDoc,collection ,updateDoc,deleteDoc,setDoc } from '@firebase/firestore';
import {db,auth} from '../Firebase';
import { getAuth,onAuthStateChanged } from '@firebase/auth';

export const ChannelNav = ({ username }) => {
  
  
    const [isSubscribed, SetisSubscribed] = useState(false);
    const [subscribe, Setsubscribe] = useState("Subscribe");
    const [bgcolorsubscription, Setbgcolorsubscription] = useState({
        backgroundColor: "#cc0000",
        color: "whitesmoke"
    });
    
    const [clicked,Setclicked]=useState(0);
    const{channelId}:{channelId:string}=useParams();
   // console.log("from channel Nav "+channelId);
    
    const channelRef = doc(db,'channels',channelId);
    
    const [isSignedIn, SetIsSignedIn] = useState(false)
    const [channelData,SetChannelData]=useState({});
    const [userId,SetUserId]=useState('');
    const [subscriberCount, SetSubscriberCount] = useState(0);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            SetUserId(user.uid)
            SetIsSignedIn(true)
        }
        else {
            SetUserId('')
            SetIsSignedIn(false)
        }
    })
    useEffect(()=>{
     
        const getchannelData= async()=>{
         const tempchanneldata= await getDoc(channelRef);
         
         console.log('mai kya kruun')
         SetChannelData(tempchanneldata.data());
         SetSubscriberCount(tempchanneldata.data().subscriberCount);
          
         }
         
        const gettingSubscription = async (id) => {

            const subRef = doc(db, `channels/${userId}/subscriptions`, id);
            console.log('hue hue huen hue channelNav')
            const subData = await getDoc(subRef)
                if (subData.data()) {
                    SetisSubscribed(true)
                }
                else {
                    SetisSubscribed(false)
                }
            
            
            }
        if(userId!==''){
            gettingSubscription(channelId)
        }
        if(channelData.channelName==undefined){
            console.log('hopefully ek hi baar chale')
            getchannelData();
        }
         
         
         {/*handling color of subscribe button */ }
        function subcolor() {

            if (!isSubscribed) {
                Setbgcolorsubscription({
                    backgroundColor: "#cc0000",
                    color: "whitesmoke"
                })
                Setsubscribe("Subscribe ");
            }
            else {
                Setsubscribe("Subscribed");
                Setbgcolorsubscription({ backgroundColor: "rgb(48,48,48)", color: "#adadad" })

            }
        }
        subcolor();
        },[userId,isSubscribed,channelId])





console.log(isSubscribed);

























        const funcSubscribe = async () => {
            if (isSignedIn) {
                    if(userId!==channelId){
    
                        if (isSubscribed) {
                            SetisSubscribed(false)
                            console.log("Unsubscribed")
                            SetSubscriberCount(subscriberCount - 1);
                    Setsubscribe("Subscribe ");
                    Setbgcolorsubscription({
                        backgroundColor: "#cc0000",
                        color: "whitesmoke"
                    })
                    await deleteDoc(doc(db, `channels/${userId}/subscriptions`, channelId));
                    await updateDoc(doc(db, 'channels', channelId), { subscriberCount: subscriberCount - 1 }).then(alert("unsubscribed "))
                }
                else {
                    SetSubscriberCount(subscriberCount + 1);
                    SetisSubscribed(true)
                    console.log("subscribed");
                    Setsubscribe("Subscribed");
                    Setbgcolorsubscription({ backgroundColor: "rgb(48,48,48)", color: "#adadad" })
                    await setDoc(doc(db, `channels/${userId}/subscriptions`, channelId), {
                        channelId: channelData.channelId,
                        channelName: channelData.channelName,
                        profilePic: channelData.profilePic
                    });
                    await updateDoc(doc(db, 'channels', channelId), { subscriberCount: subscriberCount + 1 }).then(alert("subscribed"))
                }
            }
            else{
                alert("you cannot subscribe to your own channel ")
            }
            }
            else {
                alert("sign in to subscribe ");
            }
    
    
        }

    return (

        <div className="MainNavContainer">
            
            <div className="avatarAndSubscribe ">
                <div style={{ display: 'flex', alignSelf: 'flex-start' }}>

                    <Avatar image={channelData.profilePic?channelData.profilePic:logo} username={'username'} />
                    <div className="ChannelNameAndSubscriberCount">
                        <strong>
                            {channelData.channelName?channelData.channelName:'Loading....'}
                        </strong>

                        <br />

                        {subscriberCount} Subscriber(s)

                    </div>
                </div>
                <div className="subbtn">
                    <button style={bgcolorsubscription} className="btn-subscribe btn-danger" onClick={funcSubscribe}>{subscribe}</button>
                </div>
            </div>
            <div className="navbar">
                <nav>
                    <ul className="navigation_Channel">
                        <Link to={`/channelpage/${channelId}/channelhome`}>
                        <li className={!(clicked===0) ? "li" : "active"} onClick={()=>{Setclicked(0)}}>HOME</li>
                        </Link>
                        <Link to={`/channelpage/${channelId}/channelVid`}>
                        <li className={!(clicked===1) ? "li" : "active"} onClick={()=>{Setclicked(1)}}>VIDEOS</li>
                        </Link>
                        <Link to={`/channelpage/${channelId}/channelAbout`}>
                        <li className={!(clicked===2) ? "li" : "active"} onClick={()=>{Setclicked(2)}}>ABOUT</li>
                        </Link>
                    </ul>
                </nav>
            </div>

        </div>
    )
}

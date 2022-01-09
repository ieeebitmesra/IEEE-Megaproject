import React, { useEffect, useState } from 'react'
import { Avatar2 } from './Avatar2'
import logo from '../images/logoyt.png';
import './ComponentCss/subfeed.css'
import { onAuthStateChanged } from '@firebase/auth';
import { auth,db } from '../Firebase';
import { collection, doc, getDocs } from 'firebase/firestore';
import { Avatar3 } from './Avatar3';
import { Link } from 'react-router-dom';
import { VideoCard } from './VideoCard';
export const Subfeed = ({ feed }) => {

const[user,SetUser]=useState({});
const[isSignedIn,SetisSignedIn]=useState(false);
const [subscriptions,SetSubscriptions]=useState([]);
const [subVideo,SetSubVideo]=useState([]);
onAuthStateChanged(auth,(user)=>{
    if(user){
        SetUser(user);
        SetisSignedIn(true)
    }
});

const getSubscriptions= async()=>{
    // console.log('mai marri jaaunga bhagwaan');
    const Subref=collection(db,`channels/${user.uid}/subscriptions`);
    const tempsubData = await getDocs(Subref);
    SetSubscriptions(tempsubData.docs.map((doc)=>({...doc.data(),uid:doc.id})));
    if(subscriptions!==[]){
        // conksole.log(subscriptions,'inside subscription function');
       
    }  
    
}


useEffect(()=>{

  if(subscriptions.length>0){
    subscriptions.forEach(async(channel)=>{
        // console.log(channel.uid);
        const collectionRef = collection(db,`channels/${channel.uid}/videos`)
        const tempData = await getDocs(collectionRef);

       subVideo.push(...tempData.docs.map((doc)=>({...doc.data(),id:doc.id})))
       
    }
    )
  }
//   console.log(subVideo)
   
if(user){
    getSubscriptions()}

},[user,subscriptions.length])
 console.log(subVideo)
   

    return (
        <div>

            <h2>{feed}</h2>
            <hr />
            
            <div className="subscribedChannels">
                {subscriptions.map((eachsubscription)=>{
                    return(<>
                    <Link to={`/channelPage/${eachsubscription.uid}/channelhome`}>
                <div className="individualSubscribedChannelCArd">
                    <Avatar2 image={eachsubscription.profilePic?eachsubscription.profilePic:logo} username={eachsubscription.channelName?eachsubscription.channelName:'getting data ...'} />
                    <p style={{marginBottom:'0rem'}} >{eachsubscription.channelName?((eachsubscription.channelName.length>7)?eachsubscription.channelName.substring(0,6)+'..':eachsubscription.channelName):'getting data...'}</p>
                </div>
                    </Link>
                    </>)
                })}
            </div>
            <hr />

            <div className="mainPage">
              {
                 !( subscriptions.length>0)?  (<div className="subscribed">
                
                    <strong>
                        NO SUBSCRIPTION YET
                    </strong>
                </div>): ( 
                    subVideo.map((eachVideo)=>{
                      
                        return(<>
                        <VideoCard thumbnail={eachVideo.thumbnailUrl} views ={eachVideo.views}channelId={eachVideo.channelId} id={eachVideo.id} title={eachVideo.title}/>
                        </>)
                    })
                )
              }

          
                
                
             
               
              
            </div>

        </div>
    )
}

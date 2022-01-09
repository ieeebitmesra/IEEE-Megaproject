import React, { useEffect, useState } from 'react'
import thumbnail from '../images/testthumbnail.jpg';
import './ComponentCss/seachVidCard.css';
import { Link } from 'react-router-dom';
import { db } from '../Firebase';
import { Avatar3 } from './Avatar3';
import { doc, getDoc } from 'firebase/firestore';
import test from "../images/testthumbnail.jpg";
export const SeachVidCard = ({views,title,id,description,thumbnail,channelId}) => {

    const[channelData,SetChannelData]=useState({});
 
 
         useEffect(()=>{ 
           if(channelId){
 
               const getchannelData= async()=>{
                   const channelRef = doc(db,'channels',channelId);
                   const tempchanneldata= await getDoc(channelRef);
                   
                   
                   SetChannelData(tempchanneldata.data());
                   
                 }
                 
                 getchannelData();
             }
         },[channelId])
         



  return (
    <>   <div class="searchcard " >

      <div>
        <Link to={`/video/${id}`}>
          <img src={thumbnail?thumbnail:test} style={{ width: '245px', height: '137px' }} alt="..." />
        </Link>
      </div>
      <div >
        <div class="card-body searchCardBody">
          <Link to={`/video/${id}`}>
            <h5 class="card-title searchCardTitle">{title}</h5>
          </Link>
          <p class="searchCardText"><small >{views} views <strong>.</strong> 2min ago</small></p>
          <div className="channelPicAndNameSearchCard">
            <Link to={`/channelPage/${channelId}/channelhome`}>

            <Avatar3 username={channelData.channelName?channelData.channelName:'username'} image={channelData.profilePic?channelData.profilePic:test} />
            <strong><small>{channelData.channelName}</small></strong>
            </Link>
          </div>
          <div className="description"><p style={{fontSize:'10px'}}>
        {description?(description.length>80?description.substr(0,77)+'...':description):'' }
            </p></div>
        </div>
      </div>

    </div>
    </>
  )
}

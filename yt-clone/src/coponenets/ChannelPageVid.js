import { collection, doc, getDocs } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { db } from '../Firebase';
import { ChannelVidCard } from './ChannelVidCard';

export const ChannelPageVid = () => {
    const{channelId}:{channelId:string}=useParams();
    const [channelVideos,SetChannelVideos]=useState([])
   const vidRef = collection(db,`channels/${channelId}/videos`)
   useEffect(()=>{

    const getChannelVideos= async()=>{
        const tempVids = await getDocs(vidRef);
        SetChannelVideos(tempVids.docs.map((doc)=>({...doc.data(),xid:doc.id})));

    }
    if(channelId){
        getChannelVideos();
    }
   },[channelId])

    return (
        <div>
            <h5>New Upload</h5>
            {channelVideos.map((video)=>{
                return(<>
                <ChannelVidCard createdAt={video.createdAt} description={video.description} thumbnail={video.thumbnailUrl} videoId = {video.xid} title={video.title} views ={video.views} />
                
                </>)
            })}
           
            
        </div>
    )
}

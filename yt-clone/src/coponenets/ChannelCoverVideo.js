import React,{useState,useEffect} from 'react';
import './ComponentCss/channelCoverVideo.css';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { doc,getDoc,collection, query, orderBy, limit, getDocs  } from '@firebase/firestore';
import {db} from '../Firebase';
export const ChannelCoverVideo = () => {

  const{channelId}:{channelId:string}=useParams();
  const channelRef = doc(db,'channels',channelId);
  const [channelVideos,SetChannelVideos]=useState([]);
  const vidRef = collection(db,`channels/${channelId}/videos`);
  const q = query(vidRef,orderBy('views','desc'),limit(1));

  const [channelData,SetChannelData]=useState({});
  useEffect(()=>{
      const getchannelData= async()=>{
       const tempchanneldata= await getDoc(channelRef);
      
       
       SetChannelData(tempchanneldata.data());
        
       }
       const getChannelVideos= async()=>{
        const tempVids = await getDocs(q);
        SetChannelVideos(tempVids.docs.map((doc)=>({...doc.data(),xid:doc.id})));

    }
    if(channelId){
        getChannelVideos();
    }
       
       getchannelData();
      },[channelId])
      
     // console.log(channelData.channelName,'  from cover Video');



    return (
        <div>{
          channelVideos.map((video)=>{
            return(<>
            <h4 className='my-1'><strong>Most Viewed Video</strong></h4>
            <hr />
             <div className="cardmb-3" style={{maxWidth: '1200px'}}>
            <div className="row g-0">
              <div className="col-md-4">
               <video src={video.vidUrl} autoPlay={true} controls controlsList='nodownload' className="img-fluid rounded-start" alt="..."/>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <Link to={`/video/${video.xid}`}>
                    <h5 className="card-ChannelCoverVideo-title">{video.title}</h5> 
                  </Link>
                  <p className="card-text">{video.views?video.views+' views':'1m Views'}</p>
                  <p className="card-text"><small className="text-muted">{video.createdAt}</small></p>
                </div>
              </div>
            </div>
          </div>
            </>)
          })
          }
        </div>
    )
}

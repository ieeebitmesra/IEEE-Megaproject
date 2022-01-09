import React,{ useState,useEffect } from 'react';
import test from "../images/testthumbnail.jpg";
import "./ComponentCss/videoCard.css";
import { Avatar2 } from './Avatar2';
import { doc,getDoc,collection  } from '@firebase/firestore';
import {db} from '../Firebase';
 
import { Link } from 'react-router-dom';
export const VideoCard = ({thumbnail,views,channelId,title,id,createdAt}) => {
    
    let str ='anjnadjnakdnknkjdnjk'
    
    const [channelData,SetChannelData]=useState({});
  

        
        
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
        
           
            <div>
            <div class="card" style={{ width: '14rem' }}>
                <Link to={`video/${id}`} >
                <img src={thumbnail?thumbnail:test} style={{width:'222px',height:'124.8px'}} class="card-img-top" alt="here" />
                </Link>
                <div class="card-body vidgridVidCard">
                   
                    <h5 class="card-title vidgridVidCard-title">
                        
                        <Link className="vidCardChannelLink" to={{
                        pathname: `/channelPage/${channelId}/channelhome`,
                        
                        }}> <Avatar2 username="jnfkan" image={channelData.profilePic?channelData.profilePic:test} /></Link>
                        <div className="vidTitleAndChannelInVideocard">

                         <Link className="vidCardChannelTitle" to={`video/${id}`} >
                        <div className="vid-card-title" >{title?((title.length)>18?title.substring(0,17)+'...':title):"loading...."}</div>   </Link>

                    <p className='channelNameinVidCard'>
                        <Link to={`/channelPage/${channelId}/channelhome`}>
                     <small className='channelNameinsideVidCard'>{channelData.channelName?channelData.channelName:'loading....'}</small> 
                    </Link>
                    <p class="card-text"><small className='ViewsAndTimeStampinVidCard'>{views?views:0} views <strong>.</strong> {createdAt?createdAt:'0'}</small></p>
                     </p>
                        </div>
                        </h5>

                </div>
            </div>
        </div>
      
      
    )
}

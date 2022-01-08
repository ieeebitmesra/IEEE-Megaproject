import React, { useEffect, useState } from 'react'
import thumbnail from '../images/testthumbnail.jpg';
import './ComponentCss/ExploreVidCard.css';
import { Link } from 'react-router-dom';
import { db } from '../Firebase';
import { Avatar3 } from './Avatar3';
import { doc, getDoc } from 'firebase/firestore';
import test from "../images/testthumbnail.jpg";
export const ExploreVidCard = ({ createdAt,views, title, id, description, thumbnail, channelId }) => {

    const [channelData, SetChannelData] = useState({});
    console.log("id:=>", id);
    console.log("title:=>", title);

    useEffect(() => {
        if (channelId) {

            const getchannelData = async () => {
                const channelRef = doc(db, 'channels', channelId);
                const tempchanneldata = await getDoc(channelRef);


                SetChannelData(tempchanneldata.data());

            }

            getchannelData();
        }
    }, [channelId])



    return (
        <>
            <div className="card ExploreCard" >
               

            <Link to={`/video/${id}`}>
                <div className="imgContainer ">
                    <img src={thumbnail} className=" card-img-top exploreImage" alt="..."/>
                </div>
            </Link>
                
                    <div className="card-body exploreCardBody">
                    <Link to={`/video/${id}`}>
                        <h5 className="card-title exploreCardTitle ">{title}</h5>
                        </Link>
                        <p style={{marginBottom:'5px',display:'flex'}} className="viewsAndTimestamp">
                        <Link style={{marginRight:'10px'}} className='channelLinkForSmallScreen'to={`/channelPage/${channelId}/channelhome`}><small  >
                        {channelData.channelName ? channelData.channelName : 'loading....'} </small></Link>
                            {views+` views`}<bold>{' '+`·`+" "}</bold>{createdAt}</p>
                            <Link to={`/channelPage/${channelId}/channelhome`}>
                    <p className="channelLink" style={{marginBottom:'5px'}}> <small className='channelNameinsideExploreVidCard' style={{display:'flex'}}><Avatar3 username="jnfkan" image={channelData.profilePic ? channelData.profilePic : test}/>{channelData.channelName ? channelData.channelName : 'loading....'}</small></p>
                            </Link>
                        <p className="card-text exploreCardText">{(description.length > 57) ? (description.substring(0, 54) + '....') : description}</p>
                        
                    </div>
                 
            </div>
            
        </>
    )
}
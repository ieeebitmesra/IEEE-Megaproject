import React, { useEffect, useState } from 'react'
import img from '../images/testthumbnail.jpg'
import { Hrcard } from './Hrcard'
import { db } from '../Firebase'
import { getDoc, doc, collection ,query,orderBy,limit, where, getDocs} from 'firebase/firestore';
import { useParams } from 'react-router-dom';
export const Recommendation = () => {
    const { videoId }: { videoId: string } = useParams();
    const vidRef = collection(db,'videos');
    const[recommendedVideos,SetRecommendedVideos]=useState([]);
    const q = query(vidRef,limit(14));
    useEffect(()=>{
        const getVideos= async()=>{
            const tempvid= await getDoc(doc(db,`videos`,videoId));
            console.log(tempvid.data())
            
            const videos =await getDocs(collection(db,`channels/${tempvid.data().channelId}/videos`))
           // console.log(tempvid);
            SetRecommendedVideos(videos.docs.map((doc)=>({...doc.data(),uid:doc.id})));
             
            }
            
            getVideos();



    },[])

    return (
        <>
            <h4>More From This Creator</h4>
            <hr />
            {
                recommendedVideos.map((video)=>{
                    if(video.uid==videoId){
                        return(<></>)
                    }
                    return(<>
                    <Hrcard createdAt={video.createdAt} img={video.thumbnailUrl?video.thumbnailUrl:img} views={video.views} Id={video.uid} title={video.title} channelName={video.channelName} channelId={video.channelId} />
                    
                    </>)
                })
            }
          <hr/>
            </>
      
    )
}

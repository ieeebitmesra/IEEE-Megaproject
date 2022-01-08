import React from 'react'
import { ExploreVidCard } from './ExploreVidCard';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { db,auth,storage } from '../Firebase';
import { getDocs,collection, query, where, limit, orderBy } from 'firebase/firestore';
export const ExplorePage = () => {
    const[trendingVideo,SetTrendingVideos]=useState([]);
    const vidRef = collection(db,'videos');
    const q = query(vidRef,orderBy('views','desc'),limit(10));
    useEffect(()=>{
        const getVideos= async()=>{
            const tempvid= await getDocs(q);
            console.log(tempvid);
            SetTrendingVideos(tempvid.docs.map((doc)=>({...doc.data(),uid:doc.id})));
             
            }
            
            getVideos();
            console.log(trendingVideo);
    },[])

console.log(trendingVideo);
    return (
        <div>
            <div style={{
                marginTop: '1rem',
                marginLeft: '1rem'
            }} className="explore-item-text">

                <h3>Trending Now  <strong>🔥</strong> </h3>
            </div>

            <hr style={{width:'75vw'}} />
            <div className="allExploreVideos" >
                {
                    trendingVideo.length>0?(trendingVideo.map((video)=>{
                        return(<>
                        
                        <ExploreVidCard createdAt={video.createdAt} views={video.views} description={video.description} channelId={video.channelId} thumbnail={video.thumbnailUrl} title={video.title} id={video.uid}/>
                        </>)
                    })):(<div className="d-flex align-items-center">
                    <strong>Loading...</strong>
                    <div className="spinner ms-auto" role="status" aria-hidden="true"></div>
                  </div>)
                }
        
            </div>

        </div>
    )
}

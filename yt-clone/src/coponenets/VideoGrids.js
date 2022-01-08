import React, { useEffect, useState } from 'react'
import { VideoCard } from "./VideoCard";
import "./ComponentCss/videogrid.css";
import { db } from '../Firebase';
import { getDocs, collection, query, orderBy } from '@firebase/firestore';
export const VideoGrids = ({ feed }) => {

  const [videos, SetVideos] = useState([]);

  const vidRef = collection(db, 'videos');
  const q = query(vidRef, orderBy('timestamp','desc'));

  useEffect(() => {
    const getVideos = async () => {
      const tempvid = await getDocs(q);
      SetVideos(tempvid.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    }

    getVideos();

  }, [])



  return (
    <>

      <h2>{feed}</h2>
      <hr />

      <div className="mainPage">
        {
          videos.length > 0 ?
            (videos.map((video) => { return (<VideoCard createdAt={video.createdAt} thumbnail={video.thumbnailUrl} views={video.views} channelId={video.channelId} id={video.id} title={video.title} />) })
            ) : (<div className="d-flex align-items-center">
              <strong>Loading...</strong>
              <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
            </div>)
        }






      </div>
    </>
  )
}

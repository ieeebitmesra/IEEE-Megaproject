import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './ComponentCss/searchResultVid.css';
import { SeachVidCard } from './SeachVidCard';
import { db } from '../Firebase';
import { collection, getDocs, doc } from 'firebase/firestore';
import notFound from '../images/noRes.svg'
export const SearchResultVid = () => {

  const { searchQuery }: { searchQuery: string } = useParams();
  const [searchQueryArray, SetsearchQueryArray] = useState([]);
  const [resultVid, SetResultVid] = useState([]);
  let SearchItem = searchQuery;
  const [videos, SetVideos] = useState([]);

  const vidRef = collection(db, 'videos');
  const fillingQueryArray = (query) => {
    searchQueryArray.splice(0, searchQueryArray.length)
    let word = '';
    for (var i = 0; i < query.length; i++) {
      let cahr = query.charAt(i);
      word += cahr
      if (cahr == ' ') {
        searchQueryArray.push((word.trim()).toLowerCase());
        word = '';

      }

    }
    console.log(searchQueryArray);

  }

  useEffect(() => {
    console.log('hopefully works jai mata di');
    const getVideos = async () => {
      const tempvid = await getDocs(vidRef);
      SetVideos(tempvid.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    }
    const getSearchResult = (queryArray) => {
      resultVid.splice(0, resultVid.length)
      videos.map((video) => {

        if (video.description) {

          for (let i = 0; i < searchQueryArray.length; i++) {
            const element = searchQueryArray[i];
            if (((video.title.toLowerCase()).search(element)) >= 0 || (((video.description.toLowerCase()).search(element)) >= 0)) {
              let lol = (video.description.toLowerCase()).search(element)
              console.log(lol);
              resultVid.push(video)
            }


          }
        }
      })




    }

    getVideos();
    fillingQueryArray(searchQuery + ' ')

    if (searchQueryArray.length > 0 && videos.length > 0) {
      getSearchResult(searchQueryArray);
    }
  }, [videos.length, searchQuery])

  console.log(resultVid);

  const NoResultFound = () => {
    console.log('not rendering why')
    return (<>{
      <>
       <div className="noSearchRes">
       
        <img style={{width:'43%'}} src={notFound} alt="" />
        <strong>NO RESULTS FOUND</strong>
      </div>
      </>
    }
     
    </>)

  }
  const Found = () => {
    return (<>
      {videos.map((video) => {

        if (video.description) {

          for (let i = 0; i < searchQueryArray.length; i++) {
            const element = searchQueryArray[i];
            if (((video.title.toLowerCase()).search(element)) >= 0 || (((video.description.toLowerCase()).search(element)) >= 0)) {
              let lol = (video.description.toLowerCase()).search(element)
              console.log(lol);
              return (<SeachVidCard description={video.description} thumbnail={video.thumbnailUrl} views={video.views} channelId={video.channelId} id={video.id} title={video.title} />)
            }


          }
        }
      })

      }
    </>)
  }
  return (
    <>
      <br />
      <div className="search-item-text">

        Showing Results of <strong>{SearchItem}</strong>
      </div>

      <hr />
      {
        videos.length>0?(!(resultVid.length>0)?<NoResultFound/>:<Found/>):<></>
      }






    </>)
}

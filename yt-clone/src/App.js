
import './App.css';
import { Navbar } from "./coponenets/Navbar";
import { SideMenu } from "./coponenets/SideMenu";
import { VideoGrids } from "./coponenets/VideoGrids";
//import {storage,ref,getDownloadURL,storageRef,uploadBytes} from './Firebase';
import logo from './images/logoyt.png';
// import video from "./videos/Myvideo.mp4"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import channelbanner from './images/bannerimg.jpg';
import { Comments } from './coponenets/Comments';
import { ExplorePage } from './coponenets/ExplorePage.js'
import { Description } from './coponenets/Description'
import { Recommendation } from './coponenets/Recommendation'
import { VideoPlayer } from './coponenets/VideoPlayer';
import { ChannelBanner } from './coponenets/ChannelBanner';
import { ChannelNav } from './coponenets/ChannelNav';
import { ChannelCoverVideo } from './coponenets/ChannelCoverVideo';
import { SearchResultVid } from './coponenets/SearchResultVid';
import {ChannelPageVid} from './coponenets/ChannelPageVid';
import {ChannelAboutPage} from './coponenets/ChannelAboutPage';
import {SignUp} from './coponenets/SignUp';
import {SignIn} from './coponenets/SignIn';
import { VideoUpload } from './coponenets/VideoUpload';
import { useState } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from './Firebase';
import { Subfeed } from './coponenets/Subfeed';
//import { useEffect, useState } from 'react';

function App() {
  const[userId,SetUserId]=useState('');
  onAuthStateChanged(auth,(user)=>{
    if(user){
      SetUserId(user.uid)
    }
    else{
      SetUserId('')
    }
  })
  

  return (
    <>
      <Router>
       
        <Navbar />
        <Switch>

          {/* Search Result Page */}

          <Route path='/searchRes/:searchQuery'>
            <div className="sidemenu_channel">
              <SideMenu />
            </div>
            <div className="searchPage">
              <SearchResultVid />
            </div>

          </Route>


          {/* video page */}
          <Route path="/video/:videoId">
                

            <div className="mainvideo">

              <VideoPlayer  />
            </div>
            <div className="other">
              <div className="desccomm">
                <Description userId={userId} />
                <div className="recommendedforSmallScreen">
                  <Recommendation/>
                </div>
                <strong> <h4>Comments</h4></strong>
                <Comments className="avatar2"  />

              </div>
              <div className="recommended">
                <Recommendation />
              </div>
            </div>
          </Route>
          {/*SignUpPage */}
          <Route  path='/signup' >
            <SignUp/>
        


          </Route>
          {/*Sign In Page */}
          <Route path ='/signin'>
            <SignIn/>
          </Route>

        {/*Video Upload Page */}

        <Route path='/videoUpload/:channelId'>
        <VideoUpload/>
        </Route>






















          {/* channel page */}


          <Route path="/channelPage/:channelId" >
            <div className="channel">

              <div className="sidemenu_channel">
                <SideMenu />
              </div>

              <div className="channelpage">
                <ChannelBanner img={channelbanner} />
                <ChannelNav  />

                {/*Channel Page Default */}

                <Route path='/channelPage/:channelId/channelhome'>
                <div className="coverVide">
                  <ChannelCoverVideo  />
                </div>
               </Route>

               {/*Channel Videos */}

               <Route path='/channelPage/:channelId/channelVid'>
                <ChannelPageVid/>
               </Route>

               {/*About Channel */}

               <Route path='/channelPage/:channelId/channelAbout'>
                <ChannelAboutPage/>
               </Route>


              </div>

            </div>
          </Route>

          {/*landing Page  */}

          <Route exact path="/">
            <div className="page">
              <div className="sidemenu">
                <SideMenu />
              </div>

              <div className="videogrid">
             
                <VideoGrids feed ={"Recommended"}/>
              </div>
            </div>


          </Route>
          {/*Subscription Page */}
          <Route exact path="/subscriptions" > 
          
          <div className="page">
              <div className="sidemenu">
                <SideMenu />
              </div>

              <div className="videogrid">
             
               <Subfeed feed ={'Subscription'}/>
              </div>
            </div>

          </Route>

          {/*Explore Page */}
          <Route path="/explorefeed" >
          <div className="sidemenuExplore">
                <SideMenu />
          
          </div>
          <div className="searchPage">
              <ExplorePage />
            </div>

          </Route>

        


        </Switch>

      </Router>
    </>
  );
}

export default App;

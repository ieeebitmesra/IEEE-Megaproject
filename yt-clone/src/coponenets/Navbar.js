import React, { useEffect, useState } from 'react'
import logo from '../images/logoyt.png';
import logoSmall from '../images/logoytSmall.png';
import { Avatar2 } from './Avatar2';
import "./ComponentCss/navbar.css";
import { db, auth } from '../Firebase';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { doc, getDoc } from '@firebase/firestore';
import {
  Link
} from "react-router-dom";
import defaultPic from '../images/defaultProfile.svg'
export const Navbar = () => {
  const [currentUser, SetcurrentUser] = useState({});
  const [channelData, SetChannelData] = useState({});
  const [isSignedIn, SetIsSignedIn] = useState(false);
  const[searchQuery,SetSearchQuery]=useState('');
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('op')
      SetcurrentUser(user);
      SetIsSignedIn(true)
    }
    else {
      SetIsSignedIn(false)
    }

  })
  useEffect(() => {

    //console.log(currentUser);

    const getchannelData = async (id) => {
      // console.log(id)
      const channelRef = doc(db, 'channels', id);
      const tempchanneldata = await getDoc(channelRef);
      if (tempchanneldata) {
        SetChannelData(tempchanneldata.data());
      }

    }
    //console.log(currentUser.uid);
    if (currentUser.uid !== undefined) {
      const call = () => {

        getchannelData(currentUser.uid)
      }
      call()
    }

  }, [currentUser])







  return (






    <div className="container-fluid">
      <div className="logoa">
        <Link to="/">
          <img className="logo" src={logo} alt="Youtube" />
          <img className='logo2' src={logoSmall} alt='Youtube'/>
        </Link>
      </div>

      <div className="search">
        <form className="d-flex my-2">
          <input className="form-control me-2" onChange={(e)=>SetSearchQuery(e.target.value)} id="inputsearch" type="search" placeholder={(channelData.channelName !== undefined) && isSignedIn ? channelData.channelName : 'search'} aria-label="Search" />
          <Link to={`/searchRes/${searchQuery}`}>
            <button id="search-btn" className="btn btn-outline-success " type="submit"><i class="fas fa-search"></i></button>
          </Link>
        </form>
      </div>
      <div className="userNavbar">

        {
          isSignedIn ? (

            <Link to={`/videoUpload/${currentUser.uid}`}>
              <div style={{display:'flex'}}>

              <i className="fas fa-video createIcon" />
              <div className="avatar2">
                <Link to={`/channelPage/${currentUser.uid}/channelhome`} >
                  <Avatar2 className="avatar2" image={(((channelData.profilePic !== undefined || channelData.profilePic !== '')) && (isSignedIn)) ? channelData.profilePic : defaultPic} username="USERNAME" />
                </Link>
              </div>
              </div>
            </Link>

          )
            :
            <Link to='/signin'>
              <button className="btn" style={{ padding: '5px', backgroundColor: '#3f3f3f', textShadow: '1px 1px black', color: '#2681DC', border: 'solid #2681DC 1px', boxShadow: 'none', borderRadius: '10px' }}>
                SignIN
                <span className='notSignedInAvatar'>
              <Avatar2 className="avatar2" image={defaultPic} username="USERNAME" />
                </span>
              </button>
            </Link>
        }


      </div>
    </div>



  )
}

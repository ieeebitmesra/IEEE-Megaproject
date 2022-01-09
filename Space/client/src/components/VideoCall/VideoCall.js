import { useState, useEffect } from "react";
import {
  config,
  useClient,
  useMicrophoneAndCameraTracks,
  
  
} from "./settings.js";


import Room from '../Room/Room.js'

export default function VideoCall(props) {
  const { setInCall } = props;
  const channelName = window.localStorage.getItem('ID');
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  
  useEffect(() => {
    
    let init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio") {
          if (user.audioTrack) user.audioTrack.stop();
        }
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      try {
        await client.join(config.appId, name, config.token, null);
      } catch (error) {
        console.log("error");
      }

      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      try {
        init(channelName);
      } catch (error) {
        console.log(error);
      }
    }
  }, [channelName, client, ready, tracks]);

  return (
      <>
        {start && tracks && <Room tracks={tracks} setStart={setStart} users={users} setInterview = {props.setInterview} user = {props.user} setInCall = {setInCall}/>}
      </>
  )
}
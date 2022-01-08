import React, { useState, useEffect } from 'react'
import { Avatar } from './Avatar';
import { Link } from 'react-router-dom';
import logo from '../images/logoyt.png';
import "./ComponentCss/description.css";
import { deleteDoc, setDoc, doc, getDoc, collection, updateDoc } from '@firebase/firestore';
import { auth, db } from '../Firebase';
import { useParams } from 'react-router';
import { onAuthStateChanged } from 'firebase/auth';

export const Description = ({ userId }) => {
    const [isSubscribed, SetisSubscribed] = useState(false);
    
    const [subscribe, Setsubscribe] = useState("Subscribe");
    const [bgcolorsubscription, Setbgcolorsubscription] = useState({
        backgroundColor: "#cc0000",
        color: "whitesmoke"
    });
    const { videoId }: { videoId: string } = useParams();
    const [isLiked, SetisLiked] = useState(false);
    const [like, SetLike] = useState("Like ");
    const [isDisliked, SetisDisliked] = useState(false);
    const [dislike, Setdislike] = useState("Dislike ");
    const [likecolor, Setlikecolor] = useState({ color: "white" });
    const [dislikecolor, SetDislikecolor] = useState({ color: "white" });
    const [subscriberCount, SetSubscriberCount] = useState(0);

    const videoRef = doc(db, 'videos', videoId);
    const [videoData, SetVideoData] = useState({});
    const [channelId, SetchannelId] = useState('');
    const [likes, SetLikes] = useState(0);
    const [dislikes, SetDislikes] = useState(0);
    const[views,SetViews]=useState(0)
    const [isSignedIn, SetIsSignedIn] = useState(false)
  
    const [channelData, SetChannelData] = useState({});
    onAuthStateChanged(auth, (user) => {
        if (user) {

            SetIsSignedIn(true)
        }
        else {

            SetIsSignedIn(false)
        }
    })

    useEffect(() => {
      
     
        const getVideos = async () => {

            const tempvid = await getDoc(videoRef);
            SetVideoData(tempvid.data())
            console.log('haa bhai aa gaya swad')
            SetLikes(tempvid.data().likes);
            SetDislikes(tempvid.data().dislikes);
            await getchannelData(tempvid.data().channelId)
            if (userId) {

                await gettingSubscription(tempvid.data().channelId).then(async()=>{

                  
                })
            }
          
            
           
                
               
          

        }

        const getchannelData = async (channelIdn) => {
            //    console.log(channelIdn)
            if (channelIdn) {

                const channelRef = doc(db, 'channels', channelIdn);
                const tempchanneldata = await getDoc(channelRef);
                SetSubscriberCount(tempchanneldata.data().subscriberCount)

                SetChannelData(tempchanneldata.data());

            }



        }
        const gettingSubscription = async (id) => {

            const subRef = doc(db, `channels/${userId}/subscriptions`, id);
            console.log('hue hue huen hue')
            const subData = await getDoc(subRef)
                if (subData.data()) {
                    SetisSubscribed(true)
                }
                else {
                    SetisSubscribed(false)
                }
            
              
            }

            const gettingLiked = async (id) => {

                const LikedRef = doc(db, `channels/${userId}/likedVideos`, id);
                console.log('hue hue huen hue gettin Liked or not')
                const likedData = await getDoc(LikedRef)
                    if (likedData.data()) {
                        SetisLiked(true)
                    }
                    else {
                        SetisLiked(false)
                    }
                
                
                }

            const gettingDisLiked = async (id) => {

                    const DislikedRef = doc(db, `channels/${userId}/DislikedVideos`, id);
                    console.log('hue hue huen hue gettin Liked or not')
                    const DislikedData = await getDoc(DislikedRef)
                        if (DislikedData.data()) {
                            SetisDisliked(true)
                        }
                        else {
                            SetisDisliked(false)
                        }
                    
                    
                    }

        

        {/*handling color of subscribe button */ }
        function subcolor() {

            if (!isSubscribed) {
                Setbgcolorsubscription({
                    backgroundColor: "#cc0000",
                    color: "whitesmoke"
                })
                Setsubscribe("Subscribe ");
            }
            else {
                Setsubscribe("Subscribed");
                Setbgcolorsubscription({ backgroundColor: "rgb(48,48,48)", color: "#adadad" })

            }
        }
       
        function likeDislikeColor(){
            if(isLiked){
                SetLike("Liked");
                Setlikecolor({ color: "rgb(55,166,241)" })
            }
            else if(isDisliked){
                Setdislike("Disliked");
                SetDislikecolor({ color: "rgb(55,166,241)" });
            }
            else if(!isLiked&&!isDisliked){
                SetLike("Like ");
                Setlikecolor({ color: "white" });
                Setdislike("Dislike ");
                SetDislikecolor({ color: "white" });
            }
        }
        if(userId){
            gettingLiked(videoId)//.then(likeDislikeColor);
            gettingDisLiked(videoId)//.then(likeDislikeColor);
            likeDislikeColor()
        }
        
        subcolor();
        getVideos()//.then(()=>{getchannelData(channelId)})
    }, [userId,isSubscribed,videoId]);



   


    console.log('Subscribed=>', isSubscribed)
    console.log(likes, 'likes', dislikes, "dislikes");
    //console.log(channelData.channelName);
    console.log(subscriberCount, " subscribers")
     //Handeling color of liked and Disliked button 
     

   
















    const funcSubscribe = async () => {
        if (isSignedIn) {
                if(userId!==videoData.channelId){

                    if (isSubscribed) {
                        SetisSubscribed(false)
                        console.log("Unsubscribed")
                        SetSubscriberCount(subscriberCount - 1);
                Setsubscribe("Subscribe ");
                Setbgcolorsubscription({
                    backgroundColor: "#cc0000",
                    color: "whitesmoke"
                })
                await updateDoc(doc(db, 'channels', videoData.channelId), { subscriberCount: subscriberCount - 1 }).then(alert("unsubscribed "))
                await deleteDoc(doc(db, `channels/${userId}/subscriptions`, videoData.channelId));
            }
            else {
                SetSubscriberCount(subscriberCount + 1);
                SetisSubscribed(true)
                console.log("subscribed");
                Setsubscribe("Subscribed");
                Setbgcolorsubscription({ backgroundColor: "rgb(48,48,48)", color: "#adadad" })
                await updateDoc(doc(db, 'channels', videoData.channelId), { subscriberCount: subscriberCount + 1 }).then(alert("subscribed"))
                await setDoc(doc(db, `channels/${userId}/subscriptions`, videoData.channelId), {
                    channelId: channelData.channelId,
                    channelName: channelData.channelName,
                    profilePic: channelData.profilePic
                });
            }
        }
        else{
            alert("you cannot subscribe to your own channel ")
        }
        }
        else {
            alert("sign in to subscribe ");
        }


    }
    const funcLike = async () => {
        if (isSignedIn) {

            if (isLiked) {
                SetisLiked(false)
                console.log("UnLiked")
                SetLikes(likes - 1);
                SetLike("Like ");
                Setlikecolor({ color: "white" })
                await updateDoc(doc(db, 'videos', videoId), { likes: likes - 1 });
                await deleteDoc((doc(db,`channels/${userId}/likedVideos`,videoId)))


            }
            else if (isDisliked) {
                SetisDisliked(false);
                Setdislike("Dislike ");
                SetDislikes(dislikes - 1);
                SetLikes(likes + 1);
                SetDislikecolor({ color: "white" });
                console.log("removed dislike and liked");
                SetLike("Liked");
                SetisLiked(true);
                Setlikecolor({ color: "rgb(55,166,241)" })
                await updateDoc(doc(db, 'videos', videoId), { likes: likes + 1 })
                await updateDoc(doc(db, 'videos', videoId), { dislikes: dislikes - 1 })
                await setDoc(doc(db,`channels/${userId}/likedVideos`,videoId),{
                    thumbnailUrl:videoData.thumbnailUrl,
                    title:videoData.title,
                    channelId:videoData.channelId,
                    videoId:videoId
                })
                await deleteDoc((doc(db,`channels/${userId}/DislikedVideos`,videoId)))

            }
            else {
                SetLikes(likes + 1);
                SetisLiked(true)
                console.log("Liked")
                SetLike("Liked");
                Setlikecolor({ color: "rgb(55,166,241)" })
                await updateDoc(doc(db, 'videos', videoId), { likes: likes + 1 });
                await setDoc(doc(db,`channels/${userId}/likedVideos`,videoId),{
                    thumbnailUrl:videoData.thumbnailUrl,
                    title:videoData.title,
                    channelId:videoData.channelId,
                    videoId:videoId
                })
            }
        }
        else {
            alert('Sign in to like')
        }

    }

    const funcDislike = async () => {
        if (isSignedIn) {

            if (isDisliked) {
                SetDislikes(dislikes - 1);
                SetisDisliked(false)
                console.log("Remove Dislike")
                Setdislike("Dislike ");
                SetDislikecolor({ color: "white" });
                await deleteDoc((doc(db,`channels/${userId}/DislikedVideos`,videoId)))

            }
            else if (isLiked) {
                SetLikes(likes - 1);
                SetDislikes(dislikes + 1)
                SetisDisliked(true);
                Setdislike("Disliked");
                Setlikecolor({ color: "white" });
                console.log("removed like and disliked");
                SetLike("Like ");
                SetisLiked(false);
                SetDislikecolor({ color: "rgb(55,166,241)" });
                await updateDoc(doc(db, 'videos', videoId), { likes: likes - 1 })
                await updateDoc(doc(db, 'videos', videoId), { dislikes: dislikes + 1 })
                await deleteDoc((doc(db,`channels/${userId}/likedVideos`,videoId)));
                await setDoc(doc(db,`channels/${userId}/DislikedVideos`,videoId),{
                    thumbnailUrl:videoData.thumbnailUrl,
                    title:videoData.title,
                    channelId:videoData.channelId,
                    videoId:videoId
                })


            }
            else {
                SetDislikes(dislikes + 1);
                SetisDisliked(true)
                console.log("Disliked")
                Setdislike("Disliked");
                SetDislikecolor({ color: "rgb(55,166,241)" });
                await setDoc(doc(db,`channels/${userId}/DislikedVideos`,videoId),{
                    thumbnailUrl:videoData.thumbnailUrl,
                    title:videoData.title,
                    channelId:videoData.channelId,
                    videoId:videoId
                })
            }
        }
        else {
            alert("Sign in first to dislkike")
        }

    }
    return (

        <>

            <div className="title">
                <h4>
                    {videoData.title}
                </h4>
                <div className="like-views-count">
                    <p>
                        {videoData.views} Views <strong>.</strong> {videoData.createdAt}
                    </p>
                    <div className="response">

                        <i onClick={funcLike} style={isLiked?{color:"rgb(55,166,241)"}:{color:'white'}} class="fas fa-1x fa-thumbs-up like"><small color='white'> {isLiked?likes+' Liked':+likes+' Like'}  </small></i>
                        <i onClick={funcDislike} style={isDisliked?{color:"rgb(55,166,241)"}:{color:'white'}} class="fas fa-1x fa-thumbs-down like"><small color='white'>{isDisliked?dislikes+' Disliked':+dislikes+' Dislike'}</small></i>
                    </div>
                </div>
                <hr />
                <div className="channelsRelated">
                    <div className="channelrel1">
                        <Link to={`/channelPage/${videoData.channelId}/channelhome`}>
                            <Avatar image={channelData.profilePic ? channelData.profilePic : logo} username="username" />
                        </Link>
                        <div className="channelDetail">
                            <Link to={`/channelPage/${videoData.channelId}/channelhome`}>
                                <h6><strong>{channelData.channelName ? channelData.channelName : 'Loading...'}</strong> </h6>
                            </Link>
                            <p>{subscriberCount>1?subscriberCount+" subscriber":subscriberCount+" subscribers"} </p>
                        </div>
                    </div>
                    <div className="channelrel2">
                        <button style={bgcolorsubscription} className="btn-subscribe btn-danger" onClick={funcSubscribe}>{subscribe}</button>
                    </div>
                </div>
                <div className="viddescription">
                    <p className="aboutvid">
                        {videoData.description}

                    </p>
                </div>
            </div>
            <hr />
        </>
    )
}

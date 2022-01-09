
import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Avatar2 } from './Avatar2';
import "./ComponentCss/comments.css"
import {PublicComments} from './PublicComments';
import { auth,storage,db } from '../Firebase';
import { doc,addDoc, collection, getDoc, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import defaultProfile from '../images/defaultProfile.svg';
export const Comments = ({image}) => {
    const[signedIn,SetIsSignedIn]=useState(false);
    const[userId,SetuserId]=useState('')
    const { videoId}: { videoId: string } = useParams();
    const [comment,SetComment]=useState('');
    const [comments,SetComments]=useState([]);
    const [user,SetUser]=useState({});
    const [commmented,Setcommented]=useState(false);
    const dateRef = new Date()
    const date = {
        minutes: dateRef.getMinutes()>9?dateRef.getMinutes():'0'+dateRef.getMinutes(),
        hours: dateRef.getHours()>9?dateRef.getHours():'0'+dateRef.getHours(),
        date: dateRef.getDate(),
        months: dateRef.getMonth()+1,
        year: dateRef.getFullYear()
    }
    const createdAtString = 'Commented At ' + date.date + '/' + date.months + '/' + date.year + "  " + date.hours + ":" + date.minutes;
    //upload Related 

    onAuthStateChanged(auth,(user)=>{
        if(user){
            console.log('op')
            SetuserId(user.uid);
            SetIsSignedIn(true);
         
        }
        else{
            SetuserId('');
            SetIsSignedIn(false);
        }
    })
    
    const gettingUserDetails=async()=>{
        console.log('getting USer DAta')
       const tempData= await getDoc(doc(db,`channels/${userId}`));
       SetUser(tempData.data());
       
    }
  
    const getcomments=async()=>{
        console.log('getting comments')
        const tempdata=await getDocs(collection(db,`videos/${videoId}/comments`));
        SetComments(tempdata.docs.map((doc)=>({...doc.data(),id:doc.id})));
   
    }
   useEffect(()=>{
       if(userId!==''){
           gettingUserDetails();
           getcomments();
           console.log('how');
       }


   },[userId,videoId])


const FakeingComment=()=>{
    const fakecomment = comment
    if(commmented){
        let time = new Date();
        return(<>
        
        <div className="publicComment">
            <Avatar2 image ={user.profilePic} username={user.channelName}/>
            <div className="pubcom-main">
                {user.channelName} <strong>.</strong> {createdAtString}  
                <p className="thePublicComment">
                    <small>{`${fakecomment}`}</small>
                </p>
            </div>
        </div>
        </>)
    }
    else{
        return(<>
        </>)
    }

}

 const addComment=async ()=>{
     Setcommented(true)
     if (signedIn) {
         if(comment!==''){

             await addDoc(collection(db, `videos/${videoId}/comments`), {
                 comment:comment,
                 userCommentedId:userId,
                 userPic:user.profilePic,
                 userName:user.channelName,
                 timestamp:createdAtString 
                }).then(()=>{alert("comment added JI");})
            }
            else{
                alert('Can not accept empty comment sorry!')
            }
     }
    else{
        alert('Sign In to comment ')
    }








 }
 let img = defaultProfile;
 let name = 'username';
 
 //console.log(username);
































    return (<>
        <div className="inputcomment">
          <Avatar2 image={user.profilePic?user.profilePic:defaultProfile} username={user.channelName?user.channelName:'username'} />
            <form className="CommentForm"   >
                <input placeholder="Add a public comment ....." type="text" value={comment} onChange={(e)=>{SetComment(e.target.value)}} />
            </form>
                <button onClick={(e)=>{e.preventDefault(); addComment();Setcommented(true)}} className="postComment btn-primary" >Post</button>
        </div>
        <br />

        <FakeingComment/>
        {

      

            comments.map((eachcomment)=>{
                

                   return (<PublicComments createdAtString={eachcomment.timestamp!= undefined?eachcomment.timestamp:'0 min'} image ={eachcomment.userPic?eachcomment.userPic:defaultProfile} username = {eachcomment.userName?eachcomment.userName:'noName'} comment={eachcomment.comment}/> 
                )
            })
        }
     {/*<PublicComments image ={img} username = {name}/>
     <PublicComments image ={img} username = {name}/>
     <PublicComments image ={img} username = {name}/>
     <PublicComments image ={img} username = {name}/>
     <PublicComments image ={img} username = {name}/>
     <PublicComments image ={img} username = {name}/>
     <PublicComments image ={img} username = {name}/>
     <PublicComments image ={img} username = {name}/>
     <PublicComments image ={img} username = {name}/>
     <PublicComments image ={img} username = {name}/>
     <PublicComments image ={img} username = {name}/>
     <PublicComments image ={img} username = {name}/>
     <PublicComments image ={img} username = {name}/>
     <PublicComments image ={img} username = {name}/>
     <PublicComments image ={img} username = {name}/>
     <PublicComments image ={img} username = {name}/>
     <PublicComments image ={img} username = {name}/>
     <PublicComments image ={img} username = {name}/>
     <PublicComments image ={img} username = {name}/>
     <PublicComments image ={img} username = {name}/>
     <PublicComments image ={img} username = {name}/>
     <PublicComments image ={img} username = {name}/>
     <PublicComments image ={img} username = {name}/>
     <PublicComments image ={img} username = {name}/>
     <PublicComments image ={img} username = {name}/>
     <PublicComments image ={img} username = {name}/>
     <PublicComments image ={img} username = {name}/>
     <PublicComments image ={img} username = {name}/>
     <PublicComments image ={img} username = {name}/>
     <PublicComments image ={img} username = {name}/>*/}
</>    )
}

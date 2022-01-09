import { useEffect, useState } from "react";
import firebase from "firebase/compat";
import UserCard from "../UserCard/UserCard";
import { AppBar, Toolbar ,Button} from "@mui/material";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MatchCalculator from "../MatchCalculator/MatchCalculator";
import "./FriendList.css";
import EmptyCard from "../../EmptyCard/EmptyCard";


function FriendList(props) {
    
    const db = firebase.firestore();
    
    const [friendsDetails,setFriendsDetails] = useState([]);
    
    useEffect(()=>{
        const foruseeffect=async()=>{
        // Fetching Details of actv user 
        const docSnapshot = await db.collection("Users").doc(props.uid).collection("Details").doc("Details").get()
        const actvuserDetails = docSnapshot.data();
        
        // Fetching details of actv user's friends 
        const friendUids = actvuserDetails.friends;
        // console.log(friendUids);
        const friendsData = [];
        await Promise.all(friendUids.map(async(friendUid)=>{
            const docSnapshot = await db.collection("Users").doc(friendUid).collection("Details").doc("Details").get();
            let friendDetails = docSnapshot.data();
            console.log(friendDetails);
            friendDetails = {
                ...friendDetails,
                matchPercent: MatchCalculator(actvuserDetails,friendDetails)
            }
            friendsData.push(friendDetails);
        }))
        setFriendsDetails(friendsData);
    }
    foruseeffect()
    },[db, props.uid]
    );

    let bgcolor = "#fff"
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		// For dark mode chagne the material ui appbar
		bgcolor="#181a1b"
	}
    const color = bgcolor === "#fff"?"black":"white"

    function RemoveFriend(friend){
        const userRef = db.collection("Users").doc(props.uid).collection("Details").doc("Details");
        const friendRef = db.collection("Users").doc(friend).collection("Details").doc("Details");

        // Remove friend's Uid from user's friend list
        userRef.update({
            friends: firebase.firestore.FieldValue.arrayRemove(friend)
        })

        // Remove user's Uid from Friend's friend list
        friendRef.update({
            friends: firebase.firestore.FieldValue.arrayRemove(props.uid)
        })
    }

    return (
        <div className= "Friends-list-container">
                <AppBar position="static" elevation={1} sx={{
                    bgcolor: bgcolor,
                    color: color
                    }}>
                <Toolbar sx={{gap: "1ch"}}>
                {props.back && <Button onClick={props.back}>{"<"}</Button>}
                    <PeopleAltIcon />
                    {props.option}
                </Toolbar>
                </AppBar>
                <div className="Friends-card-container">
                    {(friendsDetails.length > 0) && friendsDetails.map(friend=> <UserCard 
                    key={friend} uid={friend.uid} name={friend.name} icon={friend.icon} 
                    matchPercent={friend.matchPercent} text = "Remove Friend" func = {RemoveFriend}/>)}
                    {(friendsDetails.length ===0)&& <EmptyCard type="frlist" text={"wow such empty"}/>}
                </div>
        </div>
    );
}

export default FriendList;
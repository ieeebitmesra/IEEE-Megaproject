import React, { useEffect, useState } from "react";
import firebase from "firebase/compat";
import "./AllUsers.css";
import UserCard from "../UserCard/UserCard";
import {AppBar,Toolbar,Button} from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MatchCalculator from "../MatchCalculator/MatchCalculator";


export default function AllUsers(props) {
    
    const db = firebase.firestore();

    const [everyUserDetails,setEveryUserDetails] = useState([]);
    const [actvUserDetails,setActvUserDetails] = useState([]);

    useEffect(()=>{
        const foruseeffect = async()=>{
            let details = [];
            
            // fetching uid's of actv user's friends
            const actvUserRef = await db.collection("Users").doc(props.uid).collection("Details").doc("Details").get()
            const actvUserData = actvUserRef.data();
            
            // fetching uid of every user
            const docSnapshot = await db.collection("Users").get();
            const docs =  docSnapshot.docs;
            
            // fetching details of every user 
            await Promise.all(docs.map(async(user)=>{
                const doc = await db.collection("Users").doc(user.id).collection("Details").doc("Details").get();
                let temp = doc.data();
                temp = {
                    ...temp,
                    matchPercent: MatchCalculator(actvUserData,temp)
                }
                details = [...details, temp];
            }))
            
            setActvUserDetails(actvUserData)
            
            // Sorting details acc. to matchPercent with Actv user in Dec. order
            details.sort((a,b)=>{ 
                if(a.matchPercent>b.matchPercent){
                    return -1;
                }
                if(b.matchPercent>a.matchPercent){
                    return 1;
                }
                return 0;
            })

            setEveryUserDetails(details)
        }
        foruseeffect()

    },[db,props.uid]);
    let bgcolor = "#fff"
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		// For dark mode chagne the material ui appbar
		bgcolor="#181a1b"
	}
    const color = bgcolor === "#fff"?"black":"white"

    function AddFriend(uid) {
        db.collection("Users").doc(uid).collection("Pending Requests").doc(props.uid).set({
            receivedTime: firebase.firestore.FieldValue.serverTimestamp()
        });
    }

    return(
        <div className = "All-User-List-Container">
        <AppBar position="static" elevation={1} sx={{
                bgcolor: bgcolor,
                color: color,
                }}>
            <Toolbar sx={{gap: "1ch"}}>
                {props.back && <Button onClick={props.back}>{"<"}</Button>}
                <PersonAddIcon />
                {props.option}
            </Toolbar>
        </AppBar>
            <div className = "UserCard-Container">
            {(everyUserDetails.length!==0) && everyUserDetails.map((user)=>
                (!actvUserDetails.friends.includes(user.uid)&&user.uid!==props.uid) && 
                <UserCard key={user.uid} uid={user.uid} name = {user.name} 
                icon = {user.icon} matchPercent={user.matchPercent} text="Add Friend" func = {AddFriend} />
            )
            }
            </div>
        </div>
    );


}
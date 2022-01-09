import "./MessageCard.css"
import firebase from "firebase/compat";
import {Avatar} from '@mui/material'
import { useEffect, useState } from "react";
function MessageCard(props) {
        //initalise firestore
        const firestore = firebase.firestore();
        const [src, setSrc] = useState("")
        // Get message creater avatar
        useEffect(()=>{
            const messagesRef = firestore.collection("Users").doc(props.uid).collection("Details").doc("Details");
            messagesRef.get().then(async(senderData)=>{
            const temp = await senderData.data().icon
            setSrc(temp)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        })}, [])
    const messageClass = (props.sr === "sent"?"Message-sent":"Message-recvd")
    
    return (
        <div className = {"Message-Card "+messageClass}>
            <Avatar src={src} />
            <div className="Message-Card-Text">
            {props.children}
            </div>
        </div>
    )
}

export default MessageCard

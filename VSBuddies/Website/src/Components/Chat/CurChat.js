import { Send } from "@mui/icons-material";
import {
	AppBar,
	Avatar,
    Button,
	Toolbar,
} from "@mui/material";
import firebase from "firebase/compat";
import { useState, useEffect, useRef } from "react";
import MessageCard from "./MessageCard/MessageCard";
import { useCollectionData } from 'react-firebase-hooks/firestore';
function CurChat(props) {
    //initalise firestore
    const firestore = firebase.firestore();
    const messagesRef = firestore.collection("Users").doc(props.uid).collection("Messages");
    const recipientRef = firestore.collection("Users").doc(props.curChat).collection("Messages")
    // messages ref -> firebase ref to the users Messages Collection
    // recipient ref -> firebase ref to the recipients Messages Collection
    const recvdquery = messagesRef.orderBy("createdAt")
    // this is a query to fetch all the messages by/to user
    const [rcvd] = useCollectionData(recvdquery, { idField: 'id' })
    /* [
        author: ___,
        createdAt: ___,
        message: ___,
        to: ___,
        id: ___
    ]...
    
    */
    // this hook auto updates the rcvd which is an array of message objects
    const filteredrcvd = rcvd?rcvd.filter(msg=>((msg.author === props.uid && msg.to===props.curChat)||(msg.to === props.uid && msg.author === props.curChat ))):[]
    // filter through the rcvd array to find messages between the user and recipient
    // line 34 to 44 check if the user is on a mobile device for future use
    const [width, setWidth] = useState(window.innerWidth);
    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
    // eslint-disable-next-line no-unused-vars
    const isMobile = width <= 768;

    // Bind the input from chat box to messageInput State
    const [messageInput, setMessageInput] = useState("")
    const messageInputChange= (e)=>{
        setMessageInput(e.target.value)
    }
    // Handles form submission ie sending message
    const sendMessage = async (e)=>{
        e.preventDefault();
        if(messageInput!==""){
            // add message object to user's Message collection
        await messagesRef.add({
            message: messageInput,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            author: props.uid,
            to: props.curChat
        })
        // add message object to recipient's Message collection
        await recipientRef.add({
            message: messageInput,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            author: props.uid,
            to: props.curChat
        })}
        setMessageInput("")
        dummy.current.scrollIntoView({behavior: 'smooth'});
    }
    let bgcolor = "#fff"
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		// For dark mode chagne the material ui appbar
		bgcolor="#181a1b"
	}
    const color = bgcolor === "#fff"?"black":"white"
    const dummy = useRef();
    return (
        <div className="CurChat">
            <AppBar position="static" elevation={1} sx={{
                bgcolor: bgcolor,
                color: color
                }}>
            <Toolbar>
                <div style ={{
                    fontFamily: "Poppins",
                    display: "flex",
                    gap: "1ch",
                    textAlign: "center",
                    alignItems: "center"
                }}>
            {isMobile&&(
                <Button onClick={props.back}> {"<"} </Button>
            )}
            <Avatar className="chat-appbar-icon" src={props.friendObj.icon}/>
            {props.friendObj.name}
                </div>
            </Toolbar>
            </AppBar>
            <div className="messages-container">
                {/* Iterate through filetered messaged, applying a class of sent or recieved */}
            {filteredrcvd?(filteredrcvd.map(msgObject=><MessageCard
                key={msgObject.id} sr={msgObject.author === props.uid?"sent":"recieved"} 
                uid={msgObject.author}>
                    {msgObject.message}
                </MessageCard>)):""}
            <span ref={dummy}></span>
            </div>
            <form className="message-form" onSubmit={sendMessage}>
                <input className="message-input" value={messageInput} onChange={messageInputChange} placeholder="Message"/>
                <Button variant="text" type="submit" sx={{background: "#fff"}}>
                    <Send />
                </Button>
            </form>
        </div>
    )
}

export default CurChat

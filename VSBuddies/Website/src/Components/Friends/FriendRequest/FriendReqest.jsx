import firebase from "firebase/compat";
import {useState,useEffect} from "react";
import {AppBar,Toolbar, Button} from "@mui/material";
import SenderCard from "./SenderCard/SenderCard";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import "./FriendRequest.css";
import MatchCalculator from "../MatchCalculator/MatchCalculator";
import EmptyCard from "../../EmptyCard/EmptyCard";

function FriendRequest(props) {
    const db = firebase.firestore();

    // senderDetails contains details of every user that sent req to actv user
    const [senderDetails,setSenderDetails] = useState([]);
    
    useEffect(() => {
		const foruseeffect = async () => {
			const temp = await db
				.collection("Users")
				.doc(props.uid)
				.collection("Details")
				.doc("Details")
				.get();
			const actvUserDetails = temp.data();

			const docSnapshot = await db
				.collection("Users")
				.doc(props.uid)
				.collection("Pending Requests")
				.get();
			// Uids of sender
			const senderUids = docSnapshot.docs;
			const senderData = [];

			// fetching details of sender
			await Promise.all(
				senderUids.map(async (sender) => {
					const docSnapshot = await db
						.collection("Users")
						.doc(sender.id)
						.collection("Details")
						.doc("Details")
						.get();
					let details = docSnapshot.data();
					details = {
						...details,
						matchPercent: MatchCalculator(actvUserDetails, details),
					};
					senderData.push(details);
				})
			);

			// Sorting senderData acc. to matchPercent with Actv user in Dec. order
			senderData.sort((a, b) => {
				if (a.matchPercent > b.matchPercent) {
					return -1;
				}
				if (b.matchPercent > a.matchPercent) {
					return 1;
				}
				return 0;
			});

			setSenderDetails(senderData);
		};
		foruseeffect();
	}, [db, props.uid]);

    let bgcolor = "#fff"
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		// For dark mode chagne the material ui appbar
		bgcolor="#181a1b"
	}
    const color = bgcolor === "#fff"?"black":"white"

    return (
        <div className="All-sender-list-container">
            <AppBar position="static" elevation={1} sx={{
                    bgcolor: bgcolor,
                    color: color
                    }}>
                <Toolbar sx={{gap:"1ch"}}>
                {props.back && <Button onClick={props.back}>{"<"}</Button>}
                    <ArrowCircleRightIcon />
                    {props.option}
                </Toolbar>
            </AppBar>
            <div className="Sender-card-container">
                {(senderDetails.length > 0) && 
                    senderDetails.map(sender=> 
                    <SenderCard key={sender.uid} uid = {sender.uid} receiverUid = {props.uid} 
                    name={sender.name} matchPercent={sender.matchPercent} icon= {sender.icon} />)
                }
								{(senderDetails.length === 0) &&
								<EmptyCard type="req" text="You're all caught up" />
								}
            </div>
        </div>
    );

}

export default FriendRequest;
import {
	AppBar,
	Avatar,
	Button,
	Toolbar,
} from "@mui/material";
import "./Dashboard.css";
import ChatIcon from '@mui/icons-material/Chat';
import { useEffect, useState } from "react";
import Chat from "../Chat/Chat"
import { PersonAdd } from "@mui/icons-material";
import firebase from "firebase/compat"
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MODAL from "../Modal/Modal";
import LogoutIcon from '@mui/icons-material/Logout';

function Dashboard(props) {
	//initalise firestore
    const firestore = firebase.firestore();
	const [avatarSrc, setAvatarSrc] = useState({icon: "", name: ""})
	// if user details are incomplete modal will appear
	const [showModal,setShowModal] = useState(false);

	useEffect(()=>{
		const foruseeffect = async()=>{
			//get user icon from firestore db
			const avatarSrcRef = await firestore.collection("Users").doc(props.user.email).collection("Details").doc("Details");
			avatarSrcRef.get().then(async(doc)=>{
				const temp = await doc.data()
				// Display Modal if user details incomplete
				if(temp){
					if(temp.name==="No-Name"||temp.bio.length===0
					||temp.college.length===0||temp.topTwoLanguages[0].length===0
					||temp.topTwoLanguages[1].length===0||temp.interests.length===0){
						setShowModal(true);
					}
					setAvatarSrc(temp)
				}
			})
		}
		foruseeffect();
	}, [firestore, props.user.email])


	let bgcolor = "#fff"
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		// For dark mode chagne the material ui appbar
		bgcolor="#181a1b"
	}
	const color = bgcolor === "#fff"?"#1976d2":"white"
	// Checks if user is in the Chat section or add Friends Section, initialises to 0 ie chats
	const [curActivity,setCurActivity] = useState(0);
	const [width, setWidth] = useState(window.innerWidth);
	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}
	useEffect(() => {
		window.addEventListener("resize", handleWindowSizeChange);
		return () => {
			window.removeEventListener("resize", handleWindowSizeChange);
		};
	}, []);
	const isMobile = width <= 768;
	return (
		<div className="Dashboard">
			<AppBar position="static" className="dashboard-navbar" elevation={3} sx={{
				bgcolor: bgcolor,
				color: color
				}}>
				<Toolbar>
					<div className="dashboard-nav-left">
						<Avatar src={avatarSrc.icon } />
						{!isMobile && avatarSrc.name}
					</div>
					<Link to={`/profile/${props.user.email}`}>
						<Button className="dashboard-nav-btn" variant="outlined" >
							<AccountCircleIcon color="primary"/>
						</Button>
					</Link>
					<Link to={"/connect"}>
						<Button className="dashboard-nav-btn" variant="outlined" >
							<PersonAdd color="primary"/>
						</Button>
					</Link>
					<Button className="dashboard-nav-btn" variant="outlined" onClick={()=>{
						setCurActivity(0)
					}}>
						<ChatIcon color="primary"/>
					</Button>
					<Button className="dashboard-nav-btn" onClick={props.func} variant="outlined">
						<LogoutIcon/>
					</Button>
				</Toolbar>
			</AppBar>
			{showModal && <MODAL />}
		{/* On currActivity 0 -> renders Chat  */}
		{curActivity===0&&<Chat uid={props.user.email}/>}
		</div>
	);
}

export default Dashboard;

// /Profile?uid={}

// /Profile?uid={anouauoad}
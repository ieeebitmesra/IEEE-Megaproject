import { useParams,Link } from 'react-router-dom';
import firebase from "firebase/compat";
import {useEffect,useState} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {Button, FormControl, FormLabel} from "@mui/material";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import "./Details.css";
import { collegeList, interests, languages} from './Data/Data';

export default function Details(){
    // uid of actv user
    const {uid} = useParams();
    
    // to check if user is logged in or not
    const auth = firebase.auth();
    const db = firebase.firestore();

    const [userDetails,setUserDetails] = useState({});
    const [values,setValues] = useState({
        name : "Your Name",
        college : "Your College",
        bio : "Short bio about you",
        languages : ["Language 1","Language 2"] ,
        theme: "dark"
    })
    const [user,loading] = useAuthState(auth);

    useEffect(()=>{
        async function foruseeffect(){
            if(user){
                const docSnapshot = await db.collection("Users").doc(uid).collection("Details").doc("Details").get();
                const details = docSnapshot.data();
                const temp = {
                    name: details.name,
                    college: details.college,
                    bio: details.bio,
                    languages: details.topTwoLanguages,
                    theme: details.theme,
                    github: details.github
                }
                setValues(temp);
                setUserDetails(details);  
            }
        }
        foruseeffect();
    },[user,db,uid])

    function handleChange(e) {
        const value = e.target.value;
        const target = e.target.name;
        if(target==='1'||target==='2'){
            const index = target-1;
            const temp = {
                ...values
            }
            temp.languages[index] = value;
            console.log(temp);
            setValues(temp);
        } 
        else if(target === "bio"){
            console.log(value.length)
            if(value.length>100){
                return;
            }
            const temp = {
                ...values,
                [target] : value    
            }
            console.log(temp);
            setValues(temp);
        }else{
            const temp = {
                ...values,
                [target] : value    
            }
            console.log(temp);
            setValues(temp);
        }
    }

    function handleChecked(e){
        const isChecked = e.target.checked;
        const value = e.target.name;
        console.log(isChecked,value);
        if(!isChecked){
            setUserDetails( prevDetails => {
                const temp = prevDetails.interests.filter(interest => interest!==value);
                return {...prevDetails,interests:temp};
            });
            return;
        } else{
            setUserDetails(prevDetails=>{
                const temp = [...prevDetails.interests,value];
                return {...prevDetails,interests:temp};
            });
            return;
        }
    }

    async function handleSubmit(e){
        e.preventDefault()
        console.log(values);
        console.log(userDetails.interests);
        const newDetails={
            ...userDetails,
            name: values.name,
            college: values.college,
            bio: values.bio,
            topTwoLanguages: values.languages,
            theme: values.theme,
            github: values.github
        }
        console.log(newDetails);
        await db.collection("Users").doc(uid).collection("Details").doc("Details").update(newDetails);
        window.location.replace(`https://vsbuddies.netlify.app/profile/${uid}`);
    }

    return (user && user.email===uid ? 
        ((Object.keys(userDetails).length!==0) && 
            <div className="Details">
                <div className="form-heading"> User Details </div>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                    <FormControl fullWidth sx={{fontFamily:"Poppins"}}>

                        <TextField label="Name" name="name"
                        value={values.name} onChange = {handleChange} 
                        margin="normal"/>
                    
                        <TextField label="Bio" name="bio"
                        value={values.bio} onChange={handleChange}
                        helperText="*Short bio of you in 100 chars" margin="normal"/>

                        <TextField label="Github Username" name="github"
                        value={values.github} onChange = {handleChange} 
                        margin="normal"/>

                        <TextField select label="Theme" name="theme"
                            value={values.theme} onChange={handleChange}
                            margin="normal">
                            <MenuItem value="dark">dark</MenuItem>
                            <MenuItem value="light">light</MenuItem>
                        </TextField>
                    
                        <FormLabel component="legend" >Interests</FormLabel>
                        <div className="interest-container" margin="normal">
                            {interests.map((interest,index)=>{
                                if(userDetails.interests && userDetails.interests.includes(interest)){
                                    return <FormControlLabel key={index} control={<Checkbox name={interest}
                                        checked onChange={handleChecked}/>} 
                                        label={interest} />
                                } else{                                    
                                    return <FormControlLabel key={index} control={<Checkbox name={interest}
                                    onChange ={handleChecked}/>} 
                                    label={interest} />
                                }
                            })}
                        </div>

                        <TextField select label="College/Univesity" name="college"
                            value={values.college} onChange = {handleChange} 
                            margin="normal">
                            {collegeList.map(college=>
                                <MenuItem key={college} value={college}>{college}</MenuItem>
                            )}
                        </TextField>
                    </FormControl>

                    <FormControl fullWidth>
                        <FormLabel component="legend" >Fill Two Programming Languages</FormLabel>
                        <TextField select label="Programming Language 1" name="1"
                            value={values.languages[0]} onChange = {handleChange} 
                            margin="normal">
                            {languages.map(language=>
                                <MenuItem key={language} value={language}>{language}</MenuItem>
                            )}
                        </TextField>
                        <TextField select label="Programming Language 2" name="2"
                            value={values.languages[1]} onChange = {handleChange} 
                            margin="normal">
                            {languages.map(language=>
                                <MenuItem key={language} value={language}>{language}</MenuItem>
                            )}
                        </TextField>
                    </FormControl>
                        <div className="form-btn">
                            <Button variant="contained" type="Submit">Save</Button>
                        </div>
                        <footer className='detail-foot'>
                            <p className='detail-para'>*Update Your Extension List from the VSCode Extension for more Accurate Match Percent</p>
                        </footer> 
                    </form>
                </div>
            </div>) : (!loading &&
            <div className="not-logged">
                <div className="message">Please Login to edit your Details.</div>
                <Link to="/" >
                    <Button variant="contained" color="primary" 
                    type="Submit">Login</Button>
                </Link>
            </div>
        )
    )
}
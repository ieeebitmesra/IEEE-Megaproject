import React from 'react'
import {useEffect,useState} from 'react'
import './Github.css'
import Loading from '../../Loading/Loading.jsx'
import Tabs from './Tabs/Tabs.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Repositories from './Repositories/Repositories.js'
const Github = () => {  
   const [gitProfile,setGitProfile] = useState();
   const [repositories,setRepo] = useState();
   const getProfileData = async (id) =>{
      let res = await fetch(`https://api.github.com/users/${id}`, {
            method: "GET", headers: {
                'Content-Type': 'application/json'
            },
        });
        let data = await res.json();
        
        if(data.message == "Not Found"){
         toast('User Not Found', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        }else{
         setGitProfile(data);
         getRepos(id);
        }
        
   }
   const search = ()=>{
      var a = document.querySelector('.git-search');
      let gitId = a.value;
      console.log("git",gitId);
      
      getProfileData(gitId);
      
      
      
   }
   const getRepos = async(id)=>{
      let res = await fetch(`https://api.github.com/users/${id}/repos`, {
            method: "GET", headers: {
                'Content-Type': 'application/json'
            },
        });
        let data = await res.json();
        setRepo(data);
   }
   useEffect(()=>{
      
   },[true])
   if(gitProfile && repositories){
   return (
      <>
         <div className="p-4 search-div d-flex justify-content-center" style = {{"width":"100%"}}>
         <div class="input-group mb-3" style = {{"padding":"0px","max-width":"300px",}}>
            <input type="text" class="form-control git-search" style = {{"margin":"0px","outline":"none"}} placeholder="Github username" aria-label="Recipient's username" aria-describedby="button-addon2"/>
            <button class="btn btn-dark" onClick={search} type="button" style = {{"margin":"0px"}} id="button-addon2"><i className = "fa fa-search"></i></button>
         </div>
         </div>
         <div className = "row">
         <div className="cardN ms-3 p-2 col-sm-4 col-md-4">
            <img src={gitProfile.avatar_url} alt="name" style={{"width":"50%"}}/>
            <h1>{gitProfile.name}</h1>
            <p class="title">{gitProfile.bio}</p>
            <button className = "git-brief btn-sm btn-dark">Public Repos: {gitProfile.public_repos}</button>
            <button className = "git-brief btn-sm btn-info">Public Gists: {gitProfile.public_gists}</button>
            <button className = "git-brief btn-sm btn-success">Followers : {gitProfile.followers}</button>
            <button className = "git-brief btn-sm btn-danger">Following : {gitProfile.following}</button>
            <div className = "d-flex flex-column git-info-box my-3">
               <div className = "pt-2"><strong>Company</strong> : {gitProfile.company?gitProfile.company:"N/A"}</div>
               <hr></hr>
               <div><strong>Website/blog</strong> : {gitProfile.blog?gitProfile.blog:"N/A"}</div>
               <hr></hr>
               <div><strong>Location</strong> : {gitProfile.location?gitProfile.location:"N/A"}</div>
               <hr></hr>
               <div className = "pb-3"><strong>Member</strong> Since : {gitProfile.created_at.slice(0,10)}</div>
            </div>
         </div>   
         <div className = "col-md-7 col-sm-7">
            <Tabs repos={repositories} user={gitProfile} />
            <Repositories repos={repositories} user={gitProfile} />
         </div>
         </div>
      </>
   )
   }else{
      return(
      <div className="s-div d-flex flex-column justify-content-center align-items-center" >
         <i class="fab fa-github" style = {{fontSize:"200px"}}></i>
      <div className="p-4 search-div" >
      <div class="input-group mb-3" style = {{"padding":"0px","width":"50vw",}}>
         <input type="text" class="form-control git-search" style = {{"margin":"0px","outline":"none"}} placeholder="Github username" aria-label="Recipient's username" aria-describedby="button-addon2"/>
         <button class="btn btn-dark" onClick={search} type="button" style = {{"margin":"0px"}} id="button-addon2"><i className = "fa fa-search"></i></button>
      </div>
      </div>
      <ToastContainer />
      </div>
      )
   }
}


export default Github

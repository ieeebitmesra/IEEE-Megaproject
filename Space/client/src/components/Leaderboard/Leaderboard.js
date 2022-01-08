import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../Loading/Loading'
import './Leaderboard.scss'


const Leaderboard = (props) => {

   const navigate = useNavigate();
   const [Users, setUsers] = useState();
   const [user,setUser] = useState(props.user);
   let data = [];
   let count = 0;
   useEffect(() => {
      if (localStorage.getItem('userMain')) {
         let u = JSON.parse(localStorage.getItem('userMain'));
         setUser(u);
       }
      getAllUser();
      document.title = 'Leaderboard | Space';
      // eslint-disable-next-line
   }, []);

   const getAllUser = async () => {
      // eslint-disable-next-line
      let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/leaderboard`, {
         method: "GET", headers: {
            'Content-Type': 'application/json'
         },
      });
      let alluserData = await res.json();

      alluserData.users.forEach((ele) => data.push({
         name: ele.name,
         id: ele._id,
         quesSolved: ele.questionsSolved.length
      }));
      // console.log(data);
      data.sort((a, b) => b.quesSolved - a.quesSolved);
      setUsers(data);
   }

   if (Users) {

      return (
         <>
            <div className="container-lead">
               <h1>Leaderboard</h1>
               <ul className="responsive-table">
                  <li className="table-header">
                     <div className="col col-1"><strong>Rank</strong></div>
                     <div className="col col-2"><strong>Name</strong></div>
                     <div className="col col-3"><strong>Questions solved</strong></div>
                  </li>
                  {
                     Users.map((ele) => {
                        count++;
                        
                        return ((user._id === ele.id)?
                           <li className="table-row" style = {{"backgroundColor":"rgb(189 194 196)"}}>
                              <div className="col col-1" data-label="rank">{count} </div>
                              <div className="col col-2" id="lead_user" onClick={() => navigate(`/profile/${ele.id}`)} data-label="name">{ele.name} </div> 
                              <div className="col col-3" data-label="qs">{ ele.quesSolved }</div>
                           </li>
                        :
                           <li className="table-row">
                              <div className="col col-1" data-label="rank">{count} </div>
                              <div className="col col-2" id="lead_user" onClick={() => navigate(`/profile/${ele.id}`)} data-label="name">{ele.name}</div> 
                              <div className="col col-3" data-label="qs">{ ele.quesSolved }</div>
                           </li>
                        );
                     }
                     )
                  }
               </ul>
            </div>
         </>
      )
   } else {
      return (
         <Loading />
      )
   }
}
export default Leaderboard

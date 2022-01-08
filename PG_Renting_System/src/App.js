import Home from './Home';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from './About';
import Services from './Services'
import AllPg from './AllPg';
import PgDetail from './PgDetail';
import Register from './register';
import Slider from './slider';
import Login from './login';
import Profile from './Profile';

function App() {

// console.log('hi')
const [ user, setLoginUser] = useState({})

useEffect(() => {
  setLoginUser(JSON.parse(localStorage.getItem("MyUser")))
}, [])

const updateUser = (user) => {
  localStorage.setItem("MyUser", JSON.stringify(user))
  setLoginUser(user)
}

console.log("jjjj",user)
  return (
    <Router>
      <div className="App">
        
       
          <Switch>
            <Route exact path="/">
            {
              user && user._id  ?  <Home updateUser={updateUser} /> : <Login updateUser={updateUser}/>
            }

             
            </Route>
        
           <Route exact path="/about">
             <About /> 
           </Route>
            
           <Route exact path="/services">
             <Services /> 
           </Route>
      

            <Route exact path="/profile">

<Profile />

            </Route>

            <Route exact path="/slider" >
              <Slider />

              </Route>           
              

           <Route path = "/allPg">
             <AllPg />
             </Route> 

             <Route path="/PgDetail/:id">
               <PgDetail />
              </Route>

               <Route exact path="/register">
                 <Register />
               </Route>

               <Route exact path="/login"  >
                 <Login />
               </Route>

          

          </Switch>
        </div>
      
    </Router>
  );
}

export default App;

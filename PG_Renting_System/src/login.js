import React, {useState,useEffect} from "react"
 
import { useHistory } from "react-router-dom"

const Login = ( ) => {
    const [ user0, setLoginUser] = useState(null)
    const updateUser = (user0) => {
      localStorage.setItem("MyUser", JSON.stringify(user0))
      setLoginUser(user0)
    }
    
    const history = useHistory()

    const [ user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {

        fetch(("/login") , {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }).then((result) => {
      
    
            result.json().then((res) => {
        
                if(res.user) {
                    alert(res.message)
                    updateUser(res.user)
                    history.push("/")
                   } else {
                    alert(res.message) 
                   }   
            });
          });
    }

    return (
     <div className="loginAndRegister">
            <div className="login">
             
            <h1>  PG Finder Login  </h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={() => history.push("/register")}>Register</div>
        </div>
     </div>
    )
}

export default Login;
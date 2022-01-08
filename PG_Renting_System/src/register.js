import React, { useState } from "react"

import { useHistory } from "react-router-dom"

const Register = () => {

    const history = useHistory();

    const [ user, setUser] = useState({
        name: "",
        email:"",
        password:"",
        reEnterPassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { name, email, password, reEnterPassword } = user
        if( name && email && password && (password === reEnterPassword)){
            fetch(("/register") , {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
              }).then((result) => {
          
        
                result.json().then((res) => {
                
 
    alert(res.message)
    history.push("/login")
 
   
 
                    
                });
              });
        } else {
            alert("invlid input")
    }
               
    }

    return (
      <div className="loginAndRegister">

<div className="register">
            {console.log("User", user)}
            <h1>Register</h1>
            <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={ handleChange }></input>
            <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange }></input>
            <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange }></input>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange }></input>
            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button" onClick={() => history.push("/login")}>Login</div>
        </div>
      </div>
    )
}

export default Register
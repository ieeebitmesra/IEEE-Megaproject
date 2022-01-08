import React,{useState} from 'react'
import './ComponentCss/signin.css'
import brandImg from '../images/account.svg'
import logo from '../images/logoyt.png'
import { onAuthStateChanged, signInWithEmailAndPassword } from '@firebase/auth'
import { auth } from '../Firebase';
import { Link } from 'react-router-dom'
export const SignIn = () => {
    
    const[regEmail,SetregEmail]=useState('');
    const[regpass,SetRegPass]=useState('');
    const [isSignedIn,SetisSignedIn]=useState(false)
    onAuthStateChanged(auth,(user)=>{
        if(user){
            SetisSignedIn(true);
        }
        else{
            SetisSignedIn(false);
        }
    })
const handleSignIn=async(e)=>{
    e.preventDefault();
    console.log('signed in');
    signInWithEmailAndPassword(auth,regEmail,regpass).then((userCredential) => {
       
        const user = userCredential.user;
        if(user){
            alert('signed in')
        }
       
      })
      .catch((error) => {
      
        alert(error.message);
     
      });;;
}
   
const RedirectToyt=()=>{
    if(isSignedIn){
        return(<>
        <button className="btn-primary continueToYtSingIn">Continue To Youtube</button>
        
        </>)
    }
    else{
        return(<></>)
    }
}
      
    return (

        <div>


            <div className="SignUpForm">
                <div className="SingUpFormContainer">


                    <div className="SignForm">
                        <img style={{ objectFit: 'contain', width: '10rem' }} src={logo} alt="" />


                        <h4>Sign in to your Youtube Account</h4>
                        

                        <form className="signIndetailForm">
                           
                            <input autoComplete={true} onChange={(e) => SetregEmail(e.target.value)} className='inputSignUpdetailForm' placeholder="Enter Your Email.." type="email" />
                            <input onChange={(e) => SetRegPass(e.target.value)} className='inputSignUpdetailForm' placeholder="Enter Password" type="password" />
                           
                            <button onClick={(e) => { handleSignIn(e) }} className="btn-primary inputSignUpdetailFormBtnSubmit" >SignIn</button>
                        <Link to='/'>
                        <RedirectToyt/>
                        </Link>
                        </form>

                        {/**  */}

                    </div>
                    <div className="brandIamgeAtSignUpForm">

                        <img src={brandImg} alt="" />
                        <h6 style={{ marginLeft: '4rem' }}>Your Data Is Sequere With Us</h6>

                    </div>
                </div>
            </div>

        </div>

    )
}

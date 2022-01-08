import React, { useState, useEffect } from 'react'
import '../login.css'
import logo from '../../assets/images/space1.gif'
import logoText from '../../assets/images/Space.png'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import axios from 'axios'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css';

export default function SignIn(props) {

    const navigate = useNavigate();
    const [forgot, setForgot] = useState(false)
    const [cc, setcc] = useState();
    const [spinner,setSpinner] = useState(false);
    const [fUser, setFuser] = useState({
        fEmail: "",
        fCode: "",
        fPass: "",
        fRepass: ""
    })
    const [newpass, setNewpass] = useState(false)
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const passInfo = () => {
        return (
            <>
                Min length 8
                <br />
                Must consist of:
                <br />
                At least 1 capital, 1 small
                <br />
                1 number
            </>
        )
    }

    useEffect(() => {
        if (localStorage.getItem('user')) {
            let token = localStorage.getItem('user');
            const passer = { token: token }
            axios.post(`${process.env.REACT_APP_SERVER_URL}/check`, passer)
                .then(res => {
                    if (res.data.message === 200) {
                        
                        props.setLoginUser(res.data.user);
                    }
                })
        }
        if (localStorage.getItem('user')) {
            navigate('/');
        }
    },[true]);

    let tt = (value) => {
        toast(value, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    let chkpass = (password) => {

        let parameter = {
            capital: false,
            small: false,
            number: false,
            len: false
        }
        if (password.length >= 8) {
            parameter.len = true;
        }
        for (let i = 0; i < password.length; i++) {
            let cur = password.charCodeAt(i);
            if (cur >= 65 && cur <= 90) {
                parameter.capital = true;
            }
            if (cur >= 97 && cur <= 122) {
                parameter.small = true;
            }
            if (cur >= 48 && cur <= 57) {
                parameter.number = true;
            }
        }
        if (parameter.capital && parameter.small && parameter.number && parameter.len) {
            return true;
        }
        else {
            return false;
        }
    }

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleForgot = e => {
        const { name, value } = e.target
        setFuser({
            ...fUser,
            [name]: value
        })
    }

    const sett = () => {
        const { fPass, fRepass, fEmail, fCode } = fUser
        if (fPass === fRepass) {
            if (chkpass(fPass)) {
                if (fCode === cc) {
                    const dataSend = {
                        email: fEmail,
                        password: fPass,
                    }
                    axios.post(`${process.env.REACT_APP_SERVER_URL}/updatePassword`, dataSend)
                        .then(res => {
                            if (res.data.status === 200) {
                                tt("password reset successfull")
                                setForgot(false);
                            }
                        })
                }
                else {
                    tt("Incorrect code");
                }
            }
            else
                tt('Weak Password');
        }
        else {
            tt("Invalid Input");
        }
    }

    const findMail = () => {
        const { fEmail } = fUser
        const sender = {
            email: fEmail,
        }
        if (fEmail) {
            //console.log('aaa ' + fEmail);
            axios.post(`${process.env.REACT_APP_SERVER_URL}/checkMail`, sender)
                .then(res => {
                    if (res.data.exist === 1) {
                        setNewpass(true);
                        let random = Math.floor(Math.random() * 16777215).toString(16);
                        const sender1 = {
                            email: fEmail,
                            code: random,
                        }
                        axios.post(`${process.env.REACT_APP_SERVER_URL}/resetPass`, sender1)
                            .then(res => {
                                if (res.data.done === 1) {
                                    setcc(random);
                                    tt("Verifiaction Code sent");
                                }
                            })
                    }
                    else {
                        toast("Email is not registered", {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                    }
                })
        }
    }
    const signin = () => {
        setSpinner(true);
        const { email, password } = user
        if (email && password) {
            axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, user)
                .then(res => {
                    toast(res.data.message, {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })

                    props.setLoginUser(res.data.user)
                    if (res.data.user) {
                        localStorage.setItem('userMain', JSON.stringify(res.data.user));
                        localStorage.setItem('user', res.data.token);
                        setSpinner(false);
                        navigate('/')
                    }
                    else{
                        setSpinner(false);
                        navigate('/login')
                    }
                });
        }
        else {
            setSpinner(false);
            toast('invalid input', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setUser({
                email: "",
                password: ""
            })
        }
    }
    return (
        <div>
            <div className="login-parent">
                <div className="container upperBox">
                    <div className="container left">
                        <img src={logo} className="gif_left phone" alt="logo"></img>
                        <img src={logoText} className="gif_left pull" alt="main_logo"></img>
                        <p className="text mb-4">A Space to practice and achieve DREAMS</p>
                    </div>
                    <div className="container right">
                        <div className="container box pb-4">
                            {forgot ?
                                <>
                                    <div className='form-group'>
                                        <input name='fEmail' type="email" value={fUser.fEmail} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"
                                            onChange={handleForgot} />
                                    </div>
                                    {newpass ?
                                        <>
                                            <div className='form-group'>
                                                <input name='fCode' type="text" value={fUser.fCode} className='form-control' placeholder='Verification Code'
                                                    onChange={handleForgot} />
                                            </div>
                                            <div className="form-group">
                                                <Tippy content={passInfo()} placement='right'>
                                                    <input type="password" value={fUser.fPass} className="form-control" id="show_hide_password" name="fPass" placeholder="Password"
                                                        onChange={handleForgot} />
                                                </Tippy>
                                            </div>
                                            <div className="form-group">
                                                <input type="password" value={fUser.fRepass} className="form-control" id="show_hide_password" name="fRepass" placeholder="Confirm Password"
                                                    onChange={handleForgot} />
                                            </div>
                                            <button style={{ marginBottom: '10px' }} className='btn btn-primary' onClick={sett}>Set Password</button>
                                        </>
                                        :
                                        <button style={{ marginBottom: '10px' }} className="btn btn-primary" onClick={findMail} >Send Code</button>
                                    }
                                    <text style={{ textDecoration: 'none', marginLeft: '15%', cursor: 'pointer' }} onClick={() => { setForgot(false) }}>Login With Email & Password</text>
                                </> :


                                <>
                                    <div className="form-group">
                                        <input name="email" type="email" value={user.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"
                                            onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="password" value={user.password} className="form-control" id="show_hide_password" placeholder="Password"
                                            onChange={handleChange} />
                                    </div>
                                    <button type="submit" className="btn btn-primary" onClick={signin}><Loader id = "spinner"
                        type="Bars"
                        color="white"
                        height={30}
                        width={30}
                        visible = {spinner}
                    />{!spinner?"Login":""}</button>
                                    <div id ="forgot" className = "mt-2">
                                    <text style={{ textDecoration: 'none',marginTop: '3px', cursor: 'pointer' }} onClick={() => { setForgot(true) }} className='back'>Forgot your password?</text>
                                    </div>
                                    <div style={{ textAlign: "center" }}>or</div>
                                    <Link className="btn btn-primary newAcc" to="/SignUp">Sign Up</Link>
                                </>}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
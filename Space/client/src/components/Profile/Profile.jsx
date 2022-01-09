import React from 'react'
import { useEffect, useState,useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Calender from '../Calender/Calender'
import Unauthorized from '../unauthorized/Unauthorized';
import Loading from '../Loading/Loading'
import {
    Button, Modal,
    ModalHeader, ModalBody
} from "reactstrap"
import './profile.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {UserRepair} from "../../App.js"

export default function Profile(props) {
    const [userProfile, setuserProfile] = useState();
    const [avatar, setAvatar] = useState();
    const [modal, setModal] = useState(false);
    const [modal1, setModal1] = useState(false);
    const [submissions, setSubmissions] = useState(0);
    // const [user,setUser] = useState(props.user);
    const { id } = useParams();
    const {user,setLoginUser} = useContext(UserRepair);
    const toggle = () => {
        setModal(!modal);
    }
    const toggle1 = () => {
        setModal1(!modal1);
    }
    useEffect(() => {
        if (localStorage.getItem('userMain')) {
            let u = JSON.parse(localStorage.getItem('userMain'));
            setLoginUser(u);
          }
        let temp = getUserProfile();
          temp.then((result)=>{
            document.title = `${result.name} | Space`;
          })
        
        // eslint-disable-next-line
    }, [id]);


    const countSubmissions = (user) => {
        let temp = 0;
        for (let i = 0; i < user.calender.length; i++) {
            temp += user.calender[i].value;

        }
        setSubmissions(temp);
    }
    const getUserProfile = async () => {

        let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/profile/${id}`, {
            method: "GET", headers: {
                'Content-Type': 'application/json'
            },
        });

        let userData = await res.json();
        setuserProfile(userData.user);
        const fullName = userData.user.name.split(' ');
        const nameString = fullName[0] + '+' + fullName[fullName.length - 1]
        let av = await fetch(`https://ui-avatars.com/api/?name=${nameString}&background=171C3D&color=FFFFFF`)
        setAvatar(av);
        countSubmissions(userData.user);
        return userData.user;
       
    }
    const handleSubmit = async (event) => {

        event.preventDefault()
        let data = { name: event.target.name.value, country: event.target.country.value, loggedIn: user._id }

        let wait =  await fetch(`${process.env.REACT_APP_SERVER_URL}/update/summary/${id}`, {
            method: "POST", body: JSON.stringify(data), headers: {
                'Content-Type': 'application/json'
            },
        });
         let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/profile/${id}`, {
            method: "GET", headers: {
                'Content-Type': 'application/json'
            },
        });
        
        let userData = await res.json();
        
        setuserProfile(userData.user);
        
        window.localStorage.setItem('userMain', JSON.stringify(userData.user));
        setLoginUser(userData.user);
        toast.success('Details Updated Successfully', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        
    }
    const handleSubmit1 = async (event) => {

        event.preventDefault()

        let data = { about: event.target.about.value, institute: event.target.institute.value, graduation: event.target.graduation.value, degree: event.target.degree.value, loggedIn: user._id }

        let wait =  await fetch(`${process.env.REACT_APP_SERVER_URL}/update/about/${id}`, {
            method: "POST", body: JSON.stringify(data), headers: {
                'Content-Type': 'application/json'
            },
        });
         let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/profile/${id}`, {
            method: "GET", headers: {
                'Content-Type': 'application/json'
            },
        });
        
        let userData = await res.json();
        
        setuserProfile(userData.user);
        
        window.localStorage.setItem('userMain', JSON.stringify(userData.user));
        setLoginUser(userData.user);
        toast.success('Details Updated Successfully', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        
    }

    const year = (new Date()).getFullYear();
    const years = Array.from(new Array(7), (val, index) => index + year);
    const verdictColor = (element) => {
        if (element.verdict === 'Accepted') {
            return <h6 style={{ "color": "green" }}>{element.verdict}</h6>
        } else if(element.verdict === "Rejected") {
            return <h6 style={{ "color": "red" }}>{element.verdict}</h6>
        } else{
            return <h6 style={{ "color": "blue" }}>{element.verdict}</h6>
        }
    }
    const rumn = ()=>{
        return <div id="profile-submissions" className="d-flex">
            <a href = "/problemset">No problems to show start solving....</a>
        </div>
        
    }
    if (user._id === undefined) {
        return (
            <Unauthorized />
        )
    }
    if (userProfile) {
        return (
            <div className="container-fluid" style={{ "backgroundColor": "#F5F5F5" }}>
                <div id="outer-div" className="container">

                    <div id="left-profile-data">
                        <div className="left-card">
                            <div id="profile-summary-card">
                                <span id="initials-avatar" className="d-flex justify-content-between">
                                    <img src={(avatar) ? avatar.url : ""} alt="Avatar" />
                                    {(user._id !== userProfile._id) ? null : <button onClick={toggle} type="button" className="summary-edit-button">
                                        <i class="fas fa-edit"></i>
                                    </button>}
                                </span>
                                <h1 id="profile-heading">{userProfile.name}</h1>
                                <p id="profile-user-name">{userProfile.email}</p>
                            </div>
                            <p id="profile-user-name">{(userProfile.country) ? userProfile.country : "-"}</p>

                        </div>
                        <hr></hr>
                        <div className="left-card">
                            <h4 className="d-flex justify-content-between">About
                                {(user._id !== userProfile._id) ? null : <button onClick={toggle1} type="button" className="summary-edit-button">
                                    <i class="fas fa-edit"></i>
                                </button>}
                            </h4>
                            <div className="info-container">
                                <p className="profile-about">Institute</p>
                                <strong>{userProfile.institute}</strong>
                            </div>
                            <div className="info-container">
                                <p className="profile-about">Expected year of graduation</p>
                                <strong>{userProfile.graduation}</strong>
                            </div>
                            <div className="info-container">
                                <p className="profile-about">Program/Degree</p>
                                <strong>{userProfile.degree}</strong>
                            </div>
                            <div className="info-container">
                                <p className="profile-about">More about me</p>
                                <strong>{userProfile.about}</strong>
                            </div>
                        </div>
                    </div>
                    <div id="right-profile-data">
                        <div className="right-card">
                            <h6 className="px-3 pt-2"><i class="fas fa-clipboard-check"></i> &nbsp; Submissions</h6>
                            <hr></hr>
                            <div id = "submissions-box">

                                {
                                    (userProfile.solutions.length>0)?(userProfile.solutions.slice(0).reverse().map((element) => {

                                        return <><div id="profile-submissions" className="d-flex">
                                            <Link id="ques-link" to={`/problemPage/${element.question._id}`}><h6>{element.question.title}</h6></Link>
                                            <Link id="solu-link" to={`/solution/${element._id}`}><h6>Solution</h6></Link>
                                            <div id="verdict-text">{verdictColor(element)}</div>
                                        </div>
                                            {/* <hr></hr>   */}
                                        </>
                                        // console.log(element);
                                    })
                                    ):rumn()
                                }
                            </div>
                        </div>
                        <div className="right-card">
                            <h6 className="px-3 pt-2"><i class="far fa-calendar-alt"></i> &nbsp; {submissions} submissions this year</h6>
                            <Calender calender={userProfile.calender}></Calender>
                        </div>
                    </div>
                </div>
                {/* modal for profile summary */}
                <Modal isOpen={modal} toggle={toggle} className="modal-40w" centered >
                    <ModalHeader
                        toggle={toggle} className="modal-cen" centered >Edit Intro</ModalHeader>
                    <ModalBody className='modal-col d-flex justify-content-center' centered>
                        <form id="schedule-form" onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="row">
                                    <fieldset className="col-xs-12 col-sm-6 col-md-6">

                                        <div className="input-area my-4" style={{ "textAlign": "center" }}>
                                            <input className='modal-in' type="text" autoComplete="off" placeholder="Name" name="name" required />
                                            <label className="label-name"></label>
                                        </div>

                                        <div className="input-area my-4" style={{ "textAlign": "center" }}>
                                            <input className='modal-in' type="country" autoComplete="off" placeholder="Country" name="country" />
                                            <label className="label-name"></label>
                                        </div>
                                    </fieldset>

                                </div>

                            </div>
                            <div style={{ "margin": "auto" }}>
                                <Button type="submit" color="dark" onClick={toggle} id="schedule-submit-btn" >Submit</Button>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
                {/* Modal for about panel................................................... */}
                <Modal isOpen={modal1} toggle={toggle1} className="modal-40w" centered >
                    <ModalHeader
                        toggle={toggle1} className="modal-cen" centered >Edit About</ModalHeader>
                    <ModalBody className='modal-col d-flex justify-content-center' centered>
                        <form id="schedule-form1" onSubmit={handleSubmit1}>
                            <div className="modal-body">
                                <div className="row">
                                    <fieldset className="col-xs-12 col-sm-6 col-md-6">
                                        <div className="input-area my-4" style={{ "textAlign": "center" }}>
                                            <input className='modal-in form-control form-control-lg mb-1 about-class' type="text" autoComplete="off" placeholder="About yourself......" name="about" />
                                            <label className="label-name"></label>
                                        </div>
                                        <div className="input-area my-4" style={{ "textAlign": "center" }}>
                                            <input className='modal-in form-control form-control-lg mb-1' type="text" autoComplete="off" placeholder="Institute" name="institute" />
                                            <label className="label-name"></label>
                                        </div>
                                        <div className="input-area my-4" style={{ "textAlign": "center" }}>
                                            <input list="year" className="modal-in form-control form-control-lg mb-1" name="graduation" placeholder="Select year of graduation" />
                                            <datalist id="year">
                                                {
                                                    years.map((year, index) => {
                                                        return <option key={`year${index}`} value={year}>{year}</option>
                                                    })
                                                }
                                                <option value="Still in high school"></option>
                                            </datalist>
                                        </div>
                                        <div className="input-area my-4" style={{ "textAlign": "center" }}>
                                            <input className='modal-in form-control form-control-lg mb-1' type="text" autoComplete="off" placeholder="Program/Degree" name="degree" required />
                                            <label className="label-name"></label>
                                        </div>
                                    </fieldset>

                                </div>

                            </div>
                            <div style={{ "margin": "auto" }}>
                                <Button type="submit" color="dark" onClick={toggle1} id="schedule-submit-btn" >Submit</Button>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
                <style jsx global>{`
            .modal-40w {
                width: 40vw;
                max-width: none !important;
            }
            `}
                </style>
                <ToastContainer />
            </div>
        )
    } else {
        return (
            <Loading />
        )
    }
}

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './problemPage.css'
import Ide from '../ide/Ide';
import Loading from '../Loading/Loading';
// import {Link} from 'react-router-dom';

export default function ProblemPage(props) {
    const { id } = useParams();
    const [qquestion, setQuestion] = useState();
    const [user,setUser] = useState(props.user);
    // eslint-disable-next-line
    const [userProfile,setuserProfile] = useState({solutions:[]});
    const getQuestion = async () => {
        let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/problemPage/${id}`, {
            method: "GET", headers: {
                'Content-Type': 'application/json'
            },
        });
        
        const questionData = await res.json();
        
        setQuestion(questionData.question);
    }
    const getUser = async()=>{
        let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/profile/${user._id}`, {
            method: "GET", headers: {
                'Content-Type': 'application/json'
            },
        });
        let userData = await res.json();
        setuserProfile(userData.user);
        console.log(userData.user);
        

    }
   
    useEffect(() => {
        if (localStorage.getItem('userMain')) {
            let u = JSON.parse(localStorage.getItem('userMain'));
            setUser(u);
          }
        getQuestion();
        getUser();
        // eslint-disable-next-line
    }, [])


    if (qquestion) {
        return (
            <>
                <div className='container d-flex align-items-center justify-content-center '>
                    <div className='col-sm-9 col-lg-9 col-xs-8 problem-statement'>
                        <h3 className='mt-4'>{qquestion.title}</h3>
                        <div className='problem-container p-3 mt-4'>
                            <h5 className='mb-2'>Problem Statement</h5>
                            <p className='mb-4'>{qquestion.problem.problemStatement}</p>
                            <h6 className='mb-2 mt-4'>Input Format</h6>
                            <p className='mb-4'>{qquestion.problem.inputFormat}</p>
                            <h6 className='mb-2 mt-4'>Output Format</h6>
                            <p className='mb-4'>{qquestion.problem.outputFormat}</p>
                            <h6 className='mb-2 mt-4'>Constraints</h6>
                            <p className='mb-4'>{qquestion.problem.constraints}</p>
                            <h6 className='mb-2 mt-4'>Sample Input</h6>
                            <p className='mb-4'>{qquestion.problem.sampleInput}</p>
                            <h6 className='mb-2 mt-4'>Sample Output</h6>
                            <p className='mb-4'>{qquestion.problem.sampleOutput}</p>
                            <h6 className='mb-2 mt-4'>Explanation</h6>
                            <p className='mb-4'>{qquestion.problem.explanation}</p>
                        </div>
                        <div className='ide mt-5'>
                            <Ide user={user} question={qquestion} />
                        </div>
                    </div>
                    
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <Loading />
            </>
        )
    }
}

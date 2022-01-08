import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './puzzlePage.css'
import Loading from '../Loading/Loading';
export default function ProblemPage(props) {
    const { id } = useParams();
    const [qquestion, setQuestion] = useState();
    const [user,setUser] = useState(props.user);
    const getQuestion = async () => {
        let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/puzzlePage/${id}`, {
            method: "GET", headers: {
                'Content-Type': 'application/json'
            },
        });
        
        const questionData = await res.json();
        
        setQuestion(questionData.question);
    }
    useEffect(() => {
        if (localStorage.getItem('userMain')) {
            let u = JSON.parse(localStorage.getItem('userMain'));
            setUser(u);
          }
        getQuestion();
        // eslint-disable-next-line
    }, [])


    if (qquestion) {
        return (
            <>
                <div className='container'>
                    <div className='col-sm-9 col-lg-9 col-xs-12'>
                        <h3 className='mt-4'>{qquestion.title}</h3>
                        <div className='problem-container p-3 mt-4'>
                            <h5 className='mb-2'>Puzzle Statement</h5>
                            <p className='mb-4 puzzle-text'>{qquestion.problem.problemStatement}</p>

                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button bg-dark acc-btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            See Solution
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div className="accordion-body puzzle-text">
                                            {qquestion.answer}
                                        </div>
                                    </div>
                                </div>

                            </div>

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

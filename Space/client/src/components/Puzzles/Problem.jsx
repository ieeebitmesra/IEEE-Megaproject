import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Problem.css'
export default function Problem(props) {

    const navTo = useNavigate();
    const problemPage = () => {
        navTo(`/puzzlePage/${props.question._id}`)
    }

    return (

        <div className="container" id="problem-container">
            <div className="card d-flex card-css" id="inner-problem-div">
                <div className="card-body">
                    <h5 className="card-title">{props.question.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{props.question.difficulty}</h6>
                </div>
                <div id="button-container">
                    <button type="button" className="btn btn-dark but-c" onClick={problemPage}>Solve</button>
                </div>
            </div>
        </div>
    )

}

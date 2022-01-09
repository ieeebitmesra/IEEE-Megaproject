import React,{useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import './Problem.css';
import { UserRepair } from '../../App.js';
export default function Problem(props) {
    const {user} = useContext(UserRepair);
    const navTo = useNavigate();
    const problemPage = () => {
        navTo(`/problemPage/${props.question._id}`)
    }
    const isSolved = ()=>{
        if(user.questionsSolved.indexOf(props.question._id) !== -1){
            return true;
        }else{
            return false;
        }
        
    }

    return (

        <div className="container" id="problem-container">
            <div className="card d-flex card-css" id="inner-problem-div">
                <div className="card-body">
                    <h5 className="card-title">{props.question.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{props.question.difficulty}, {props.question.tag}</h6>
                </div>
                <div id="button-container">
                    {isSolved()?<button type="button" className="btn btn-secondary but-c" onClick={problemPage}>Try Again</button>:<button type="button" className="btn btn-dark but-c" onClick={problemPage}>Solve</button>}
                </div>
            </div>
        </div>
    )

}

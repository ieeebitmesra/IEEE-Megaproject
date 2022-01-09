import React from 'react'
import Problem from './Problem.jsx'
import './Puzzles.css'
import { useState, useEffect } from 'react'
import Unauthorized from '../unauthorized/Unauthorized.js'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
export default function Problemset(props) {
    const [spinner,setSpinner] = useState(false);
    const [user,setUser] = useState(props.user);
    const [filter, setFilter] = useState({
        difficulty: { easy: true, medium: true, hard: true },
    });
    const [questions, setQuestions] = useState();
    useEffect(() => {
        if (localStorage.getItem('userMain')) {
            let u = JSON.parse(localStorage.getItem('userMain'));
            setUser(u);
          }
        filterData();
        document.title = 'Practice | Space'
        // eslint-disable-next-line
    }, [])
    const parseDifficulty = (data) => {
        let parsedDiff = "";
        if (data.difficulty.easy) {
            parsedDiff = parsedDiff + "difficulty=easy&";
        }
        if (data.difficulty.medium) {
            parsedDiff = parsedDiff + "difficulty=medium&";
        }
        if (data.difficulty.hard) {
            parsedDiff = parsedDiff + "difficulty=hard&";
        }
        if (parsedDiff.length === 0) {
            parsedDiff = "difficulty=easy&difficulty=medium&difficulty=hard&";
        }
        return parsedDiff;
    }
    
    const filterData = async () => {
        setSpinner(true);
        let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/problemset/puzzleFilter/?${parseDifficulty(filter)}`, {
            method: "GET", headers: {
                'Content-Type': 'application/json'
            },
        });
        let data = await res.json();
        setSpinner(false);
        setQuestions(data.puzzles);

    }
    const handleTags = async (event) => {
        event.preventDefault();
       
        let difficulty = { easy: true, medium: true, hard: true };
        
        
        difficulty.easy = document.getElementById("difficulty-easy").checked;
        difficulty.medium = document.getElementById("difficulty-medium").checked;
        difficulty.hard = document.getElementById("difficulty-hard").checked;
        
        let data = {difficulty: difficulty }
        setFilter(data);
        setSpinner(true);
        let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/problemset/puzzleFilter/?${parseDifficulty(data)}`, {
            method: "GET", headers: {
                'Content-Type': 'application/json'
            },
        });
        let data2 = await res.json();
        setSpinner(false);
        setQuestions(data2.puzzles);
    }
    if (user === undefined) {
        return (
            <Unauthorized />
        )
    }
    else {
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark problempage-heading">
                    <h3 className="mx-4" style={{ "color": "white" }}>Puzzles</h3>
                </nav>
                <div id="problemset-container" className="container d-flex">
                    <div id="problems-container">
                    <Loader id = "spinner"
                        type="Bars"
                        color="gray"
                        height={100}
                        width={100}
                        visible = {spinner}
                    />
                        {

                            questions && questions.map((question) => {
                                return <Problem question={question} key={question._id} />
                            })
                        }
                    </div>
                    <div id="tag-form-container">
                        <form id="tags-form" onSubmit={handleTags}>
                            <h6>STATUS</h6>
                            
                            <hr></hr>
                            <h6>DIFFICULTY</h6>
                            <div id="difficulty-input">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="easy" id="difficulty-easy" />
                                    <label className="form-check-label" htmlFor="difficulty-easy">
                                        Easy
                                    </label>

                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="medium" id="difficulty-medium" />
                                    <label className="form-check-label" htmlFor="difficulty-medium">
                                        Medium
                                    </label>

                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="hard" id="difficulty-hard" />
                                    <label className="form-check-label" htmlFor="difficulty-hard">
                                        Hard
                                    </label>

                                </div>

                            </div>
                            <hr></hr>
                            
                            
                            <button type="submit" className="btn btn-dark">Apply</button>
                        </form>
                    </div>

                </div>

            </>
        )
    }
}

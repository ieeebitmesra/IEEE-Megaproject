import React, { useState, useEffect,useContext } from 'react'
import reset from './reset.png'
import './Ide.css'
import AceEditor from 'react-ace';
import Unauthorized from '../unauthorized/Unauthorized';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Beautify from 'ace-builds/src-noconflict/ext-beautify';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-kotlin";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-nord_dark";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-dreamweaver";
import "ace-builds/src-noconflict/ext-language_tools"
import {UserRepair} from '../../App.js';
import io from "socket.io-client";
export default function Ide(props) {
    const {user,setLoginUser} = useContext(UserRepair);
    const cDefault = `#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n\n\treturn 0;\n}`
    const javaDefault = `import java.util.*;\npublic class main {\n\tpublic static void main(String[] args) {\n\n\t}\n}`
    const kotDefault = `fun main(){\n\tprintln("Hello world!")\n}`
    const pyDefault = `print('Hello! World')`

    const [theme, setTheme] = useState('nord_dark')
    const [language, setLanguage] = useState('c_cpp')
    const [value, setValue] = useState(cDefault)
    const [output, setOutput] = useState('')
    const [input, setInput] = useState('')
    const [spinner, setSpinner] = useState(false)
    
    
    const [inputBox, setinputBox] = useState(false);
    // eslint-disable-next-line 
    const [changeSide, setchangeSide] = useState(true);
    useEffect(() => {
        if (localStorage.getItem('userMain')) {
            let u = JSON.parse(localStorage.getItem('userMain'));
            setLoginUser(u);
          }
        document.title = 'IDE | Space';
        if (!props.question) {
            setinputBox(true);
        }
        
        // eslint-disable-next-line
    }, []);
    

    const themeChange = (event) => {
        setTheme(event.target.value);
    }

    const lanChange = (event) => {
        setLanguage(event.target.value);
        let lann = event.target.value;
        
        if (lann === 'c_cpp') {
            setValue(cDefault)
            
        }
        if (lann === 'python') {
            setValue(pyDefault)
            
        }
        if (lann === 'java') {
            setValue(javaDefault)
            
        }
        if (lann === 'kotlin') {
            setValue(kotDefault)
            
        }
    }
    let timeout = null;

    function onChange(newValue) {
        setValue(newValue);
        // setchangeSide(true);
       
    }

    function resetClicked() {

        if (props.inInterview) {
            let reset = 1;
            
        }
        if (language === 'c_cpp') {
            setValue(cDefault);
        }
        if (language === 'python') {
            setValue(pyDefault);
        }
        if (language === 'java') {
            setValue(javaDefault);
        }
        if (language === 'kotlin') {
            setValue(kotDefault);
        }
    }

    function passlanguage(lan) {

        if (lan === 'c_cpp') {
            return 'cpp17';
        }
        if (lan === 'python') {
            return 'python3';
        }
        if (lan === 'java') {
            return 'java';
        }
        if (lan === 'kotlin') {
            return 'kotlin';
        }
    }
    const questionSolved = async () => {
        let data = { user: user._id, question: props.question._id };
        // eslint-disable-next-line
        let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/problemPage/solved`, {
            method: "POST", body: JSON.stringify(data), headers: {
                'Content-Type': 'application/json'
            },
        });
        let changedUser = await res.json();
        setLoginUser(changedUser);
        window.localStorage.setItem('userMain', JSON.stringify(changedUser));

    }
    function passVersion(lan) {
        if (lan === 'c_cpp') {
            return '1';
        }
        if (lan === 'python') {
            return '4';
        }
        if (lan === 'java') {
            return '4';
        }
        if (lan === 'kotlin') {
            return '3';
        }
    }

    const submitter = async () => {

        let inn, qID, uID;
        
        if (props.question) {
            inn = inputBox ? input : props.question.testCase;
            qID = props.question._id;
            uID = user._id;
        }
        else {
            inn = input;
            qID = "";
            uID = "";
        }
        

        var data = {
            script: value,
            language: passlanguage(language),
            stdin: inn,
            versionIndex: passVersion(language),
            questionID: qID,
            userID: uID
        }
        setSpinner(true);
        let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/run`, {
            method: "POST", body: JSON.stringify(data), headers: {
                'Content-Type': 'application/json'
            },
        });
        let res2 = await res.json();
        res2.cloudOut = res2.cloudOut.trim();
        
        if (inputBox)
            setOutput(res2.cloudOut);

        setSpinner(false);
        checkerToast(res2, data);



    }
    const soluLog = async (solution) => {
        // eslint-disable-next-line
        let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/solution`, {
            method: "POST", body: JSON.stringify(solution), headers: {
                'Content-Type': 'application/json'
            },
        });

    }

    const checkerToast = (res, codeObj) => {
        let solution = {
            code: codeObj.script,
            language: codeObj.language,
            question: props.question ? props.question._id : "",
            user: user ? user._id : "",
            verdict: res.verdict,
        }
        if (props.question === undefined || inputBox === true) {
            if (solution.verdict === -1) {
                toast.error('TimedOut', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else if (solution.verdict === -2) {
                toast.error('RunTime Error', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else if (solution.verdict === 0) {
                toast.error('Compilation Error', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            return;
        }
        if (solution.verdict === 1) {
            // console.log(props.question.answer)

            if (res.cloudOut === props.question.answer) {
                //correct Answer
                questionSolved();
                solution.verdict = "Accepted";
                soluLog(solution);
                toast.success('Correct Answer', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                //incorrect answer
                solution.verdict = "Rejected";
                soluLog(solution);
                toast.error('Incorrect Answer', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } else if (solution.verdict === -1) {
            //TLE
            solution.verdict = "Time Limit Exceeded";
            soluLog(solution);
            toast.error('Time Limit Exceeded', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (solution.verdict === 0) {
            //compilation
            solution.verdict = "Compilation Error";
            soluLog(solution);
            toast.error('Compilation Error', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if (solution.verdict === -2) {
            solution.verdict = "RunTime Error";
            soluLog(solution);
            toast.error('RunTime Error', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }


    if (user._id === undefined) {
        return (<Unauthorized />)
    }
    else {
        // console.log(user)
        return (
            <div id = "ide-div">
                <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ 'boxShadow': '0px 2px 10px #cecece' }} >
                    <div className="container-fluid">
                        <text className="navbar-brand">Space Online IDE</text>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent-1" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i class="fas fa-bullseye"></i>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent-1">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <text className="nav-link disabled">Language</text>
                                </li>
                                <li>
                                    <select id="language-dropdown" className="form-select" aria-label="Default select example" onChange={lanChange}>
                                        <option selected value="c_cpp">C++</option>
                                        <option value="java">Java</option>
                                        <option value="python">Python</option>
                                        <option value="kotlin">Kotlin</option>
                                    </select>
                                </li>
                                <li className="nav-item">
                                    <text className="nav-link disabled">Theme</text>
                                </li>
                                <li>
                                    <select className="form-select" aria-label="Default select example" onChange={themeChange}>
                                        <option selected value="nord_dark">Nord Dark</option>
                                        <option value="github">Github</option>
                                        <option value="eclipse">Eclipse</option>
                                        <option value="monokai">Monokai</option>
                                        <option value="chrome">Chrome</option>
                                        <option value="dreamweaver">Dream Weaver</option>
                                    </select>
                                </li>
                                <li>
                                    <img src={reset} width="30" height="30" alt="reset"
                                        style={{ marginLeft: '7px', marginTop: '5px' }}
                                        onClick={resetClicked}
                                    ></img>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>


                <AceEditor
                    placeholder={`//Write code here`}
                    mode={language}
                    theme={theme}
                    name="editor"
                    width="100%"
                    fontSize={20}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    value={value}
                    onChange={onChange}
                    commands={Beautify.commands}
                    editorProps={{
                        $blockScrolling: true
                    }}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 2,
                    }} />
                <br />
                {props.question ? <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={() => {
                        setinputBox(!inputBox);
                        console.log("box " + inputBox);
                    }} />
                    <label className="form-check-label" for="flexCheckDefault">
                        Test against custom input
                    </label>
                </div> : <></>}

                <div className="d-flex justify-content-end my-3">
                    <button type="button" className="btn btn-primary mx-3" id="run-button" onClick={submitter}>{spinner ? <Loader id="spinner"
                        type="Bars"
                        color="white"
                        height={25}
                        width={25}
                        visible={spinner}
                    /> : (inputBox ? <>Run code</> : <>Submit</>)}</button>
                </div>
                <div className="d-flex justify-content-around">
                    <div>
                        <h5 className="ms-3 mb-3">{inputBox ? <>Input</> : <></>}</h5>
                        {inputBox ? <textarea className="inputBox mb-4 ms-3 p-2" id="input-run-box" style={{ width: '25vw', height: '25vh' }} onChange={() => {
                            let currInput = document.getElementById('input-run-box');
                            setInput(currInput.value);
                        }}></textarea> : <></>}
                    </div>
                    <div>
                        <h5 className="ms-3 d-flex mb-3">{inputBox ? <>Output &nbsp;</> : <></>}{spinner && inputBox ? <Loader id="spinner"
                            type="Bars"
                            color="black"
                            height={25}
                            width={25}
                            visible={spinner}
                        /> : <></>}</h5>
                        {inputBox ? <textarea className="outputBox mb-4 ms-3 p-2" style={{ width: '25vw', height: '25vh' }} value={output}></textarea> : <></>}
                    </div>

                </div>
                <ToastContainer />
            </div>
        )
    }
}

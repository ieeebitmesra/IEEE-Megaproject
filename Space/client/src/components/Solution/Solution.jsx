import React from 'react'
import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import './Solution.css'
import Beautify from 'ace-builds/src-noconflict/ext-beautify';
import AceEditor from 'react-ace';
export default function Solution(props) {
    const {id} = useParams();
    const [solution,setSolution] = useState({});
    const [user,setUser] = useState(props.user);
    useEffect(()=>{
        if (localStorage.getItem('userMain')) {
            let u = JSON.parse(localStorage.getItem('userMain'));
            setUser(u);
          }
        getSolution();
        var editor = document.getElementsByClassName('ace_content');
        editor = editor[0];
        console.log(editor);
        // eslint-disable-next-line
    },[id])
    const getSolution = async ()=>{
        let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/solution/${id}`, {
            method: "GET", headers: {
                'Content-Type': 'application/json'
            },
        });

        let solutionData = await res.json();
        setSolution(solutionData.solution);
        
    }
    return (
        <div>
            <div className=''>
                    <div className='col-sm-9 col-lg-9 col-xs-12'>
                        
                        <div className='code-container p-3 mt-4'>
                        <h2>Your Solution</h2>
                        <AceEditor
                    placeholder={`//Write code here`}
                    mode={solution.language}
                    theme={"chrome"}
                    name="editor"
                    width="100%"
                    fontSize={20}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    value={solution.code}
                    
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

                            

                        </div>
                    </div>
                </div>
        </div>
    )
}

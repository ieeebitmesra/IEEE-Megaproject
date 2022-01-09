import React,{ useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import Particles from 'react-tsparticles'
import patriclesConfig from './config/particle-config'
import './home.css'
import inter from './inter.png'
import prob from './problem.png'
import puz from './puzzle.png'

export default function Home(props) {
    const [user,setUser] = useState(props.user);
    useEffect(() => {
        if (localStorage.getItem('userMain')) {
            let u = JSON.parse(localStorage.getItem('userMain'));
            setUser(u);
          }
        document.title = 'Home | Space';
        
        // eslint-disable-next-line
    }, []);
    props.setInterview(true);
    return (
        <div className="home1">
            <Particles
                params={patriclesConfig} />
            <div className="maincontent" style={{ textAlign: 'center' }}>
                <h1 className='selectionColor' style={{ fontSize: '50px', fontWeight: 'lighter', color: '#263238' }}>Space Helps You</h1>
                <h2 className='selectionColor' style={{ fontSize: '50px', fontWeight: 'bold', color: '#263238' }}>Build Bright Future</h2>
            </div>
            <div className="bottom_boxx" style={{ textAlign: 'center' }}>
                <div className="imgContainer mb-5">
                    <img src={inter} alt="Interview" className='imgg mb-4' />
                    <h3 className='hh3 selectionColor mt-4'>Interview</h3>
                    <Link to='/interview' style={{ "textDecoration": "none" }}><button className="btn btn-dark btn-sm">Interview </button></Link>
                </div>
                <div className="imgContainer mb-5 mbpull">
                    <img src={prob} alt="Problem" className='imgg  mb-4' />
                    <h3 className='hh3 selectionColor mt-4'>Problem Solving</h3>
                    <Link to='/problemset' style={{ "textDecoration": "none" }}><button className="btn btn-dark btn-sm">Problem Solving</button></Link>
                </div>
                <div className="imgContainer mb-5 pull">
                    <img src={puz} alt="Puzzle" className='imgg  mb-4' />
                    <h3 className='hh3 selectionColor mt-4'>Puzzles</h3>
                    <Link to='/puzzles' style={{ "textDecoration": "none" }}><button className="btn btn-dark btn-sm">Puzzles</button></Link>
                </div>
            </div>
        </div>
    )
}

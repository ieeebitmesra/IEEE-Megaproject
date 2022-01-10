import MotionHoc from "../../components/animation/Motionhoc";
import { useState, useEffect } from 'react'
import * as React from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import  background from '../../assets/background.jpg'

const HomeComponent = () => {
    // const [data, setData] = useState({})

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const data = await fetch(`/api/${uid}/user`)
    //         const json = await data.json()
    //         setData(json.user)
    //     }
    //     fetchData()
    // }, [])
    // console.log(data)
    // return (
    //     <div>                
    //         {data && data.uid}
    //         <br />
    //         {data && data.username}
    //         <br />
    //         {data && data.email}
    //     </div>
    // )
    return (
        <>
       
            <div style={{ position: "fixed", userSelect: "none" }}>Waitt...you expected a boring dashboard? Just hold the cursor and Happy Drawing!!! ❤️:/</div>
            <ReactSketchCanvas
                style={styles}
                width="100%"
                height="100%"
                strokeWidth={4}
                strokeColor="black"
                backgroundImage={background}
            />
        </>

    )
};


export default HomeComponent;

const styles = {
    border: '0.0625rem solid #9c9c9c',
    borderRadius: '0.25rem',
    // zIndex:2
    
 
};


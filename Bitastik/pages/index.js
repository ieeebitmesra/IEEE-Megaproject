import MotionHoc from "../components/animation/Motionhoc";
import TypeIt from "typeit-react";
import React from 'react'
import dynamic from 'next/dynamic'
import dbConnect from '../lib/dbconnect'
import { signInWithGoogle } from "../firebase/firebase";

const Footer = dynamic(() => import('../components/footer/footer'), { ssr: false })

const HomeComponent = () => {
    return (
        <>
            <div className="clear">
                <h1>
                    <TypeIt
                        options={{
                            strings: ["Bitastik"],
                            waitUntilVisible: true,
                            cursorChar:" "
                        }}
                    />

                </h1>
                <h1>
                    <TypeIt
                        getBeforeInit={(instance) => {
                            instance.pause(1000).type("Making Bit Fantastic").pause(750).delete(9).pause(500).type("Sarcastic").pause(750).delete(9).pause(500).type("Charismatic").pause(750).delete(11).type('Enthusiastic').pause(750).delete(12).pause(500).type('Bombastic');
                            return instance;
                        }}
                        options={{
                            loop: true,
                        }}
                    />
                </h1>
              
            </div>
            
            <div style={{position:"absolute",height:"0", bottom:"0"}}>
                <Footer />

            </div>
        </>

    )
}

export default HomeComponent



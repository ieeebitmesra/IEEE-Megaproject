
import ReactBigCalendar from "../../components/calender/ReactBigCalendar"
import React from 'react'
import MotionHoc from "../../components/animation/Motionhoc"
import Books from '../../assets/books.jpg'
const  CalendarComponents=()=> {
    return (
        <div style={{
            width: '90vw',
            color: "black",
            backgroundColor:"grey",
            padding:"20px",
            overflow:"hidden",
            // backgroundImage:`url(${Books})`
        }}>
         
                <ReactBigCalendar />
        </div>
    )
}
export default CalendarComponents





import ReactBigCalendar from "../../components/calender/ReactBigCalendar"
import React from 'react'
import MotionHoc from "../../components/animation/Motionhoc"
import Books from '../../assets/books.jpg'
const  CalendarComponents=()=> {
    return (
        <div style={{
            width: '90vw',
            color: "black",
            backgroundColor: "#b8c6db",
            backgroundImage: "linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)",
            borderRadius:"15px",
            padding:"20px",
            overflow:"hidden",

            // backgroundImage:`url(${Books})`
        }}>
         
                <ReactBigCalendar />
        </div>
    )
}
export default CalendarComponents




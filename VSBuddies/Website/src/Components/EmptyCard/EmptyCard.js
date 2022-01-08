import { CheckCircle, PeopleAlt } from '@mui/icons-material'
import Chat from '@mui/icons-material/Chat'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import React from 'react'
import "./EmptyCard.css"

function EmptyCard(props) {
  return (
    <div className='empty-card'>
      {props.type==="chat"&&<Chat />}
      {props.type==="req"&&<CheckCircle/>}
      {props.type==="frlist"&&<PeopleAlt/>}
      <br/>
      <h3>
        {props.text}
        {props.type==="frlist" && <SentimentSatisfiedAltIcon sx={{height: "2ch",width:"auto", verticalAlign: "middle"}}/>}
      </h3>
    </div>
  )
}

export default EmptyCard

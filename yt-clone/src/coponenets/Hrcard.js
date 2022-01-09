import { doc, getDoc } from 'firebase/firestore'
import React from 'react'
import { Link } from 'react-router-dom'
import { db } from '../Firebase'
import './ComponentCss/hrCard.css'

export const Hrcard = ({createAt,img,Id,title,views}) => {
    
    return (
       <>
            <div class="hrcard " >
              
                    <div>
                    <Link to={`/video/${Id}`}>
                        <img src={img} style={{width:'145px',height:'81px'}}  alt="..."/>
                        </Link>
                    </div>
                    <div >
                        <div class="card-body">
                        <Link to={`/video/${Id}`}>
                            <h5 class="card-title">{title}</h5>
                            </Link>
                        
                            <p class="card-text"><small class="text-muted">{views} views <strong>.</strong> {createAt}</small></p>
                        </div>
                    </div>
                
            </div>
       </>
       
    )
}

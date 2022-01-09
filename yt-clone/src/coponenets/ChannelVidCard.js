import React from 'react';
import './ComponentCss/channelVidCard.css';
import test from '../images/testthumbnail.jpg';
import { Link } from 'react-router-dom';

export const ChannelVidCard = ({thumbnail,videoId,title,views,description,createdAt}) => {
    return (
        <div>
            <div className="cardmb-3 channelVidcard" style={{maxWidth: '500px'}}>
            <div className="row g-0">
              <div className="col-md-4  ">
                  <Link  to={`/video/${videoId}`}>
                <img src={thumbnail?thumbnail:test}  className=" channelPageVidThumnail img-fluid rounded-start" alt="..."/>
                  </Link>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                <Link to={`/video/${videoId}`}>
                    <h5 className="card-title channelVidCarTitle">{title}</h5>
                </Link>    
                  <p className="card-text">{description?((description.length > 57) ? (description.substring(0, 54) + '....') : description):''}</p>
                  <p className="card-text"><small className="text-muted">{views} views <strong>.</strong>{createdAt}</small></p>
                </div>
              </div>
            </div>
          </div>
         <hr />
        </div>
    )
}

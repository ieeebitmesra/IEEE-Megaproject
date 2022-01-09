import React from 'react';
import { Avatar2 } from './Avatar2';
import "./ComponentCss/publicComments.css"

export const PublicComments = ({createdAtString,image,username,comment}) => {
   // let comment="hue hue hue mast video op domst kya haal badhiya sab";
    let time = new Date();
    const fakecomment = comment

    return (
        <div className="publicComment">
            <Avatar2 image ={image} username={username}/>
            <div className="pubcom-main">
                {username} <strong>.</strong> {createdAtString}
                <p className="thePublicComment">
                    <small>{fakecomment}</small>
                </p>
            </div>
        </div>
    )
}

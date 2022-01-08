import React from 'react'
import "./ComponentCss/avatar2.css"

export const Avatar2 = ({image,username}) => {
    return (
        <img src={image} alt={username.charAt(0)} class="avatar2"/>
    )
}

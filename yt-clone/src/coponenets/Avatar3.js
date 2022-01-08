import React from 'react'
import "./ComponentCss/avatar3.css"

export const Avatar3 = ({image,username}) => {
    return (
        <img src={image} alt={username.charAt(0)} class="avatar3"/>
    )
}

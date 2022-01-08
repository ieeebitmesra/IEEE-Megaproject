import React from 'react'
import "./ComponentCss/avatar.css"

export const Avatar = ({image,username}) => {
    return (
        <img src={image} alt={username.charAt(0)} class="avatar"/>
    )
}

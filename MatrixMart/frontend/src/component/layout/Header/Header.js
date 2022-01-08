import React from 'react'
import { ReactNavbar } from "overlay-navbar"

//Importing the logo placed at the left side of the page
import logo from "../../../images/logo.jpeg";

const options = {
    
    // for the documentation of overlay-navbar refer https://www.npmjs.com/package/overlay-navbar
    burgerColorHover: "white",  
    burgerColor: "rgb(104, 142, 211)",  
    logo,
    logoWidth: "20vmax",
    logoHoverSize: "10px",
    logoHoverColor: "#eb4034",

    navColor1: "rgb(78, 88, 102)",
    navColor2:"rgb(255 255 255)",

    //In case you want to change the other nav bar colors.
    // navColor3:"rgb(28 114 114)",
    // navColor4:"rgb(28 114 114)",

    link1Text: "HOME",
    link1Size: "1.3vmax",
    link1Color: "rgba(35, 35, 35,0.8)",
    link1Url: "/",
    link1ColorHover: "rgb(2, 46, 129)",
    link1Margin: "1vmax",

    link2Text: "PRODUCTS",
    link2Url: "/products",

    link3Text: "CONTACT",
    link3Url: "/contact",
    
    link4Text: "ABOUT",
    link4Url: "/about",
 
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    
    profileIconUrl: "/login",
    profileIconColorHover: "rgb(2, 46, 129)",
    profileIconColor: "rgba(35, 35, 35,0.8)",
    
    searchIconColor: "rgba(35, 35, 35,0.8)",
    searchIconColorHover: "rgb(2, 46, 129)",
    
    cartIconColor: "rgba(35, 35, 35,0.8)",
    cartIconColorHover: "rgb(2, 46, 129)",
    cartIconMargin: "1vmax",
};

const Header = () => {
    return <ReactNavbar {...options} />;
}

export default Header

import React from "react";
import "./aboutSection.css";
import { Typography, Avatar } from "@material-ui/core";
const About = () => {
    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">ABOUT</Typography>

                <div>
                    <div>
                        <Avatar
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src="https://res.cloudinary.com/mayankesh/image/upload/v1641625302/admins/logo_gcqjhw.jpg"
                            alt="Founder"
                        />
                        <Typography>MATRIX MART</Typography>
                        <span>
                            <br />
                            <br /> Matrix-mart is all about a full e-commerce web application that gives you wholesome shopping experience online.
                            In this new era, nobody really have ample time to go outside and purchase goods,now,with matrix-mart you don't have to go to items here items are coming at your destination.

                            In matrix-mart we have successfully created a platform for you all to be shopaholic.

                            If you have any further suggestions regarding improvement of our web-application,you can contact us developers in contact section.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
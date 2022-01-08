import React from "react";
import "./Contact.css";
import { Button, Typography, Avatar } from "@material-ui/core";
const About = () => {
    const visitPortfolioMayankesh = () => {
        window.location = "https://mayankesh239.github.io/my_portfolio/";
    };
    const visitPortfolioAyush = () => {
        window.location = "https://www.linkedin.com/in/ayush-sharma-b37929223/";
    };
    const visitPortfolioSamridhi = () => {
        window.location = "https://www.linkedin.com/in/samridhi-sinha-8542041ba";
    };
    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">MEET THE DEVELOPERS</Typography>

                <div>
                    <div>
                        <Avatar
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src="https://res.cloudinary.com/mayankesh/image/upload/v1641625050/admins/MayankeshJha_u859zv.jpg"
                            alt="Founder"
                        />
                        <Typography>MAYANKESH JHA</Typography>
                        <Button onClick={visitPortfolioMayankesh} color="primary">
                            VISIT PORTFOLIO
                        </Button>
                        <span>
                            WEB DEVELOPER | CP ENTHUSIAST
                            <br />
                            <br /> email: mayankesh.ss@gmail.com
                        </span>
                    </div>
                    <div>
                        <Avatar
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src="https://res.cloudinary.com/mayankesh/image/upload/v1641625573/admins/AYUSH_d79myp.jpg"
                            alt="Founder"
                        />
                        <Typography>AYUSH SHARMA</Typography>
                        <Button onClick={visitPortfolioAyush} color="primary">
                            VISIT PORTFOLIO
                        </Button>
                        <span>
                            WEB DEVELOPER | CP ENTHUSIAST
                            <br />
                            <br /> email: ayush.cool475@gmail.com
                        </span>
                    </div>
                    <div>
                        <Avatar
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src="https://res.cloudinary.com/mayankesh/image/upload/v1641626130/admins/sam_pprhwu.jpg"
                            alt="Founder"
                        />
                        <Typography>SAMRIDHI SINHA</Typography>
                        <Button onClick={visitPortfolioSamridhi} color="primary">
                            VISIT PORTFOLIO
                        </Button>
                        <span>
                            WEB DEVELOPER | CP ENTHUSIAST
                            <br />
                            <br /> email: samridhisinha1234@gmail.com
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
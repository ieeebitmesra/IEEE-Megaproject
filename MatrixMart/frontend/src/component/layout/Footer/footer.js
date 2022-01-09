import React from 'react'
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import './footer.css'
const footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <p>IDHAR KYA DEKH RHA JAKAR SHOPPING KAR</p>
                <br/>
                <p>Download the App for Android and IOS mobile phone</p>
                <img src={playStore} alt="playstore" />
                <img src={appStore} alt="Appstore" />
                <p>Ruko Zara Sabar Karo Yeh Bhi Banayengai</p>
            </div>

            <div className="midFooter">
                <h1>Matrix Mart</h1>
                <p>- a cause of Oniomania</p>
                <p>Copyrights 2021 &copy; Mayankesh Jha</p>
            </div>

            <div className="rightFooter">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3661.3338332203634!2d85.43771231480851!3d23.412304984757036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4fb53f0c27be7%3A0x66180c1cf3c5e704!2sBirla%20Institute%20of%20Technology%20-%20Mesra!5e0!3m2!1sen!2sin!4v1640576356502!5m2!1sen!2sin" width="300vw" height="400vw" title="map-MATRIXMART" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </footer>
    )
}

export default footer;

import Button from "@mui/material/Button";
import "./Home.css";
import about from "../../Media/about.png";
import ContactCard from "./ContactCard";
function Home(props) {
	return (
		<div className="Home">
			<div className="home-navbar">
				<div className="home-nav-item home-nav-first">
					<a href="#home">Home</a>
				</div>
				<div className="home-nav-item" href="#about">
					<a href="#about">About</a>
				</div>
				<div className="home-nav-item" href="#contact">
					<a href="#contact">Contact Us</a>
				</div>
			</div>
			<div id="home" className="home-container">
				<div className="home-container-main">
					<div className="home-left">
						<h1 className="home-title">VSBuddies</h1>
						<h3 className="home-descp">
							A Simple way to meet
							new friends. 
							<br />
							Let's scream at
							our screens together!
						</h3>
						<Button
							id="get-started-btn"
							variant="outlined"
							onClick={props.func}>
							Get Started!
						</Button>
					</div>
				</div>
				<div className="home-right">
				</div>
			</div>
			<svg
				className="cloud"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1440 319">
				<path
					fill="#fff"
					fillOpacity="1"
					d="M0,160L30,181.3C60,203,120,245,180,224C240,203,300,117,360,101.3C420,85,480,139,540,165.3C600,192,660,192,720,165.3C780,139,840,85,900,53.3C960,21,1020,11,1080,10.7C1140,11,1200,21,1260,64C1320,107,1380,181,1410,218.7L1440,256L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
					data-darkreader-inline-fill=""></path>
			</svg>
			<div id="about" className="about-container">
				<div className="about-text">
					<h1>About us</h1>
					<p>
						We are here to connect Developers.  
						We provide developers with opportunities that enable their growth 
						and help them to get connected with the ones having common interests and 
						high match percent. By doing that we want to become the leading developer community.
					</p>
				</div>
				<div className="about-image">
					<img src={about} alt="" />
				</div>
			</div>
			<svg
				className="cloud2"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1440 319">
				<path
					fill="fff"
					fillOpacity="1"
					d="M0,160L30,170.7C60,181,120,203,180,218.7C240,235,300,245,360,240C420,235,480,213,540,213.3C600,213,660,235,720,234.7C780,235,840,213,900,181.3C960,149,1020,107,1080,80C1140,53,1200,43,1260,64C1320,85,1380,139,1410,165.3L1440,192L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
					data-darkreader-inline-fill=""></path>
			</svg>
			<div id="contact" className="contact-container">
				<h1>Contact us</h1>
				<div className="contact-grid">
					<ContactCard type="LinkedIn" to="https://www.linkedin.com/in/lohitaksha-malhotra-b84392201/">
						Lohitaksha Malhotra
					</ContactCard>
					<ContactCard type="LinkedIn" to="https://www.linkedin.com/in/ishan-pandey-15527717b/" target="_blank">
						Ishan Pandey
					</ContactCard>
					<ContactCard type="LinkedIn" to="https://www.linkedin.com/in/ankur-pandey-96696522a/" >
						Ankur Pandey
					</ContactCard>
					<ContactCard type="Email" to="mailto:lohit244@gmail.com">
						Lohitaksha Malhotra
					</ContactCard>
					<ContactCard type="Email" to="mailto:pandey.ishan703@gmail.com">
						Ishan Pandey
					</ContactCard>
					<ContactCard type="Email" to="mailto:mailankur1902@gmail.com">
						Ankur Pandey
					</ContactCard>
					<ContactCard type="Github" to="https://github.com/Lohit244">
						Lohitaksha Malhotra
					</ContactCard>
					<ContactCard type="Github" to="https://github.com/IshanPandey703">
						Ishan Pandey
					</ContactCard>
					<ContactCard type="Github" to="https://github.com/AnkurPandey07">
						Ankur Pandey
					</ContactCard>
				</div>
				<p className="contact-p">© 2021 VSBuddies</p>
			</div>
		</div>
	);
}

export default Home;

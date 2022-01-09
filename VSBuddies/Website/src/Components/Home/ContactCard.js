import githubimg from "../../Media/github.png";
import linkedimg from "../../Media/linkedin.png";
import emailimg from "../../Media/email.png";
function ContactCard(props) {
	return (
		<div className="contact-card">
			<img
				src={
					props.type === "LinkedIn"? linkedimg: props.type === "Github"? githubimg: emailimg
				}
				alt="logo"></img>
			<a href={props.to} className="contact-link">
				{props.children}
			</a>
		</div>
	);
}

export default ContactCard;

import Events from './Events';
import Clients from './Clients';
import Contact from './Contact';
import Cover from './Cover';


function Home() {
	return (
		<div className="relative">
			<Cover />
			<Events />
			<Clients />
			<Contact />
		</div>
	);
}

export default Home;

import { EventProvider } from '../../context/EventContext';
import { CircularProgress } from '@mui/material';
import Event from '../../components/Events/Event';
import EventName from '../../components/Misc/EventName';
import { useState } from 'react';
import Head from 'next/head';
import useVenue from '../../hooks/useVenue';

const WeddingPage = () => {
	const [showModal, setShowModal] = useState(true);
	const { venues, loading } = useVenue('wedding');

	return (
		<>
			<Head>
				<title>hevently | Wedding</title>
				<meta
					name="description"
					content="Through hevently book your venue for celebrating weddings at different places of world"
				/>
			</Head>
			{!loading ? (
				<EventProvider>
					<div>
						<Event venues={venues} type="wedding" />
					</div>
					<EventName showModal={showModal} setShowModal={setShowModal} />
				</EventProvider>
			) : (
				<div className="flex h-screen w-screen fixed justify-center items-center text-xl text-center">
					<CircularProgress />
				</div>
			)}
		</>
	);
};

export default WeddingPage;

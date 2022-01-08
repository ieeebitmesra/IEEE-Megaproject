import { EventProvider } from '../../context/EventContext';
import { CircularProgress } from '@mui/material';
import Event from '../../components/Events/Event';
import EventName from '../../components/Misc/EventName';
import { useState } from 'react';
import Head from 'next/head';
import useVenue from '../../hooks/useVenue';

const CorporatePage = () => {
	const [showModal, setShowModal] = useState(true);
	const { venues, loading } = useVenue('corporate');

	return (
		<>
			<Head>
				<title>hevently | Corporate Events</title>
				<meta
					name="description"
					content="Through hevently book your venue for corporate events like Seminars, conferences, Company milestone events, Product launch events, Charity events, etc."
				/>
			</Head>
			{!loading ? (
				<EventProvider>
					<div>
						<Event type={'corporate'} venues={venues} />
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

export default CorporatePage;
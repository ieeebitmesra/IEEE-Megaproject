import { EventProvider } from '../../context/EventContext';
import { CircularProgress } from '@mui/material';
import Event from '../../components/Events/Event';
import EventName from '../../components/Misc/EventName';
import { useState } from 'react';
import Head from 'next/head';
import useVenue from '../../hooks/useVenue';

const SocialPage = () => {
	const [showModal, setShowModal] = useState(true);
	const { venues, loading } = useVenue('social');

	return (
		<>
			<Head>
				<title>hevently | Social Gathering</title>
				<meta
					name="description"
					content="Through hevently book your venue for social gathering events like Bar Crawl, Masquerade Party, Dance, Ceremonies, Galas etc."
				/>
			</Head>

			{!loading ? (
				<EventProvider>
					<div>
						<Event venues={venues} type={'social'} />
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

export default SocialPage;

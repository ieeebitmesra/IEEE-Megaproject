import { EventProvider } from '../../context/EventContext';
import { CircularProgress } from '@mui/material';
import Event from '../../components/Events/Event';
import EventName from '../../components/Misc/EventName';
import { useState } from 'react';
import Head from 'next/head';
import useVenue from '../../hooks/useVenue';

const BirthdayPage = () => {
	const [showModal, setShowModal] = useState(true);
	const { venues, loading } = useVenue('birthday');

	return (
		<>
			<Head>
				<title>hevently | Birthday</title>
				<meta
					name="description"
					content="Through hevently book your venue and celebrate your birthday"
				/>
			</Head>
			{!loading ? (
				<EventProvider>
					<div>
						<Event type="birthday" venues={venues} />
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

export default BirthdayPage;

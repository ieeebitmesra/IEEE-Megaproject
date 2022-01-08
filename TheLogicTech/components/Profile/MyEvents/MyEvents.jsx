import EventCard from './EventCard';
import { CircularProgress } from '@mui/material';
import useEvent from '../../../hooks/useEvent';

const MyEvents = () => {
	const { event } = useEvent();
	
	return (
		<>
			{!event ? (
				<div className="flex h-[40vh] w-full relative justify-center items-center ">
					<CircularProgress />
				</div>
			) : (
				<div className='pb-8'>
					<h3 className="text-3xl text-center font-semibold tracking-wider text-gray-600 py-6">
						My Events
					</h3>
					<EventCard
						title="Upcoming Events"
						id="upcoming"
						eventsData={event}
					/>
					<EventCard
						title="Completed Events"
						id="completed"
						eventsData={event}
					/>
				</div>
			)}
		</>
	);
};

export default MyEvents;

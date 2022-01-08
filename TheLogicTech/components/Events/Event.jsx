import Image from 'next/image';
import { useState, useContext } from 'react';
import { EventContext } from '../../context/EventContext';
import { UserContext } from '../../context/Users';
import { createEvent } from '../../config/api/eventAPI.js';
import sendConfirmation from '../../config/api/sendConfirmation.js';

import Venue from './Venue/Venue';
import Schedule from './Schedule';
import FormFooter from '../Misc/FormFooter';
import Alert from '../Misc/Alert';
import Guests from './Guests/Guests';
import Confirm from '../Misc/Confirmation';

import formCover from '../../public/form/form_cover.png';

const headings = {
	wedding: 'Wedding Venue',
	social: 'Restaurants',
	corporate: 'Restaurants',
	birthday: 'Restaurants',
};

const Event = ({ venues, type }) => {
	const [open, setOpen] = useState(false);
	const [openDate, setOpenDate] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const { eventData } = useContext(EventContext);
	const [position, setPosition] = useState(0);
	const { email } = useContext(UserContext);
	const [loading, setLoading] = useState(false);

	const nextPosition = () => {
		if (!eventData.venue && position === 0) {
			setOpen(true);
			return;
		}

		if ((!eventData.startDate || !eventData.endDate) && position === 1) {
			setOpenDate(true);
			return;
		}

		position++;
		if (position > 3) position = 3;
		setPosition(position);
	};

	const prevPosition = () => {
		position--;
		if (position < 0) position = 0;
		setPosition(position);
	};

	const handleSubmit = async () => {
		try {
			setLoading(true);
			const eventCreate = await createEvent(eventData, type);
			const emailConfirm = await sendConfirmation(email);
			setLoading(false);

			if (eventCreate) {
				setShowConfirm(true);
			} else {
				console.log('Error! Event not created');
			}
			if (emailConfirm) console.log('Confirmation email sent');
			else {
				console.log('Error! Confirmation email not sent');
			}
		} catch (err) {
			console.log('Error! Event not created');
			console.log(err);
		}
	};

	return (
		<div className="w-screen">
			<div className="z-50">
				<Alert
					open={open}
					setOpen={setOpen}
					severity={'warning'}
					msg={'Please select a venue to continue'}
				/>
			</div>

			<div className="z-50">
				<Alert
					open={openDate}
					setOpen={setOpenDate}
					severity={'warning'}
					msg={'Please select proper date to continue'}
				/>
			</div>

			<Confirm showConfirm={showConfirm} guestList={eventData.guestList} />

			<div className="fixed opacity-20 w-screen profile-bg h-screen right-0">
			</div>

			<div className="absolute w-full right-0 py-24 flex items-center justify-center">
				{position === 0 ? (
					<Venue venues={venues} heading={headings[type]} />
				) : null}
				{position === 1 ? <Schedule /> : null}
				{position === 2 ? <Guests /> : null}

				<FormFooter
					nextPosition={nextPosition}
					prevPosition={prevPosition}
					position={position}
					handleSubmit={handleSubmit}
					loading={loading}
					setLoading={setLoading}
				/>
			</div>
		</div>
	);
};

export default Event;

import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const EventContext = createContext([]);

export const EventProvider = ({ children }) => {
	const [eventData, setEventData] = useState({
		uid: uuidv4(),
		eventName: '',
		venue: null,
		startDate: '',
		endDate: '',
		guestList: [],
		userRatings: null,
	});
	const setVenue = (venue) => {
		let newVenue = Object.assign({}, eventData);
		newVenue.venue = venue;
		setEventData(newVenue);
	};

	const setStartDate = (startDate) => {
		let newStartDate = Object.assign({}, eventData);
		newStartDate.startDate = startDate;
		setEventData(newStartDate);
	};

	const setEndDate = (endDate) => {
		let newEndDate = Object.assign({}, eventData);
		newEndDate.endDate = endDate;
		setEventData(newEndDate);
	};

	const setGuestList = (list) => {
		let ob = Object.assign({}, eventData);
		ob.guestList = list;
		setEventData(ob);
	};
	const setEventName = (name) => {
		let ob = Object.assign({}, eventData);
		ob.eventName = name;
		setEventData(ob);
	};
	const setRatings = (ratings) => {
		let ob = Object.assign({}, eventData);
		ob.userRatings = ratings;
		setEventData(ob);
	};
	return (
		<EventContext.Provider
			value={{
				eventData,
				setVenue,
				setStartDate,
				setEndDate,
				setGuestList,
				setEventName,
				setRatings,
			}}
		>
			{children}
		</EventContext.Provider>
	);
};

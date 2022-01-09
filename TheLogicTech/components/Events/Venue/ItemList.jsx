import { useEffect, useContext } from 'react';
import { EventContext } from '../../../context/EventContext';
import ItemCard from './ItemCard';

import Aos from 'aos';
import 'aos/dist/aos.css';

const ItemList = ({ list, value }) => {
	const {
		eventData: { venue },
		setVenue,
	} = useContext(EventContext);

	useEffect(() => {
		Aos.init({
			duration: 600,
			mirror: true,
		});
	}, []);

	return (
		<div className="flex flex-wrap gap-4 z-10 w-full justify-center">
			{list
				.filter((e) => {
					if (value === '') return true;
					let s =
						e.value.toLowerCase() +
						' ' +
						e.address.toLowerCase() +
						' ' +
						e.city.toLowerCase();
					return value && s.includes(value);
				})
				.map(
					({
						_id,
						value,
						address,
						city,
						ratings,
						capacity,
						veg,
						nonveg,
						display,
					}) => {
						let selected = false;
						if (venue && venue.id === _id) selected = true;
						return (
							<ItemCard
								key={_id}
								value={value}
								city={city}
								ratings={ratings}
								capacity={capacity}
								address={address}
								veg={veg}
								nonveg={nonveg}
								display={display}
								handleBooking={() => {
									setVenue({
										id: _id,
										value,
										city,
										address,
										ratings,
									});
								}}
								booked={selected}
							/>
						);
					}
				)}
		</div>
	);
};

export default ItemList;

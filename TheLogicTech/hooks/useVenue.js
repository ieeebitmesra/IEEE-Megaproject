import useSWR from 'swr';
import { getFetcher } from '../utils/fetcher';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/Users';

const useVenue = (type) => {
	const user = useContext(UserContext);
	const [venues, setVenues] = useState();

	const { data, error } = useSWR(`/api/venue/${type}`, getFetcher);

	useEffect(() => {
		if (data) {
			setVenues(data.venues);
		}
	}, [data]);

	return {
		venues,
		loading: !user || !venues,
	};
};

export default useVenue;

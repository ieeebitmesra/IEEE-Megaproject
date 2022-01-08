import useSWR from 'swr';
import { getFetcher } from '../utils/fetcher';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/Users';

export default function useUserVenue() {
	const user = useContext(UserContext);
	const [venues, setVenues] = useState();

	const { data, error } = useSWR(
		user && user.uid
			? `/api/user/${user.uid}/uservenue`
			: null,
		getFetcher
	);

	useEffect(() => {
		if (data) {
			setVenues(data.venues);
		}
	}, [data]);

	return {
		venues,
		error,
	};
}

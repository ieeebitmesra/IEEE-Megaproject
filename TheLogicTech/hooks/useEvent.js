import useSWR, { useSWRConfig } from 'swr';
import { useContext } from 'react';
import { UserContext } from '../context/Users';
import { getFetcher } from '../utils/fetcher';

export default function useEvent() {
	const user = useContext(UserContext);

	const { data, error } = useSWR(
		user && user.uid
			? `/api/user/${user.uid}/event`
			: null,
		getFetcher
	);

	return {
		event: data && data.event,
		ok: data && data.ok,
		loading: !error && !data,
		error: error,
	};
}


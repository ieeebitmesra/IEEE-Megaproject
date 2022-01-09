import useSWR from 'swr';
import { useContext } from 'react';
import { UserContext } from '../context/Users';
import { getFetcher } from '../utils/fetcher';

export default function useUser() {
	const user = useContext(UserContext);

	const { data, error } = useSWR(
		user && user.uid
			? `/api/user/${user.uid}`
			: null,
		getFetcher
	);

	return {
		user: data && data.user,
		ok: data && data.ok,
		loading: !error && !data,
		error: error,
	};
}

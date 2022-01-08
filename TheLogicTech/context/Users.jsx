import { createContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase/firebase';

export const UserContext = createContext([]);

export const UserProvider = ({ children }) => {
	const [user] = useAuthState(auth);

	return (
		<UserContext.Provider value={user}>
			{children}
		</UserContext.Provider>
	);
};

import Profile from '../../components/Profile/Profile';
import { CircularProgress } from '@mui/material';
import Head from 'next/head';

const ProfilePage = () => {
	return (
		<>
			<Head>
				<title>hevently | Profile</title>
				<meta
					name="description"
					content="This is profile page of hevently where you can browse your profile and upcoming events you have booked"
				/>
			</Head>
			<Profile />
		</>
	);
};

export default ProfilePage;

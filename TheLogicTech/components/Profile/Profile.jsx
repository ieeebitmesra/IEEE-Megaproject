import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import MyProfile from './MyProfile/MyProfile';
import MyEvents from './MyEvents/MyEvents';
import MyRegistration from './MyRegistration/MyRegistration';
import MyDrawer from './MyDrawer';
import NavBar from './NavBar/NavBar';
import useUser from '../../hooks/useUser';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
	const displayName = props.userData ? props.userData.displayName : '';
	const photoURL = props.userData ? props.userData.photoURL : '';
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<>
			<div className="h-screen w-screen fixed profile-bg z-0 opacity-50"></div>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<NavBar
					mobileOpen={mobileOpen}
					setMobileOpen={setMobileOpen}
					displayName={displayName}
				/>
				<Box
					component="nav"
					sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
					aria-label="mailbox folders"
				>
					<Drawer
						container={container}
						variant="temporary"
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{
							keepMounted: true,
						}}
						sx={{
							display: { xs: 'block', sm: 'none' },
							'& .MuiDrawer-paper': {
								boxSizing: 'border-box',
								width: drawerWidth,
							},
						}}
					>
						<MyDrawer photoURL={photoURL} displayName={displayName} />
					</Drawer>
					<Drawer
						variant="permanent"
						sx={{
							display: { xs: 'none', sm: 'block' },
							'& .MuiDrawer-paper': {
								boxSizing: 'border-box',
								width: drawerWidth,
							},
						}}
						open
					>
						<MyDrawer photoURL={photoURL} displayName={displayName} />
					</Drawer>
				</Box>
				<Box
					component="main"
					sx={{
						flexGrow: 1,
						width: { sm: `calc(100% - ${drawerWidth}px)` },
					}}
				>
					<Toolbar />
					<MyProfile />
					<Divider />
					<MyEvents />
					<Divider />
					<MyRegistration/>
				</Box>
			</Box>
		</>
	);
}

const Profile = () => {
	const { user } = useUser();

	return (
		<div>
			<ResponsiveDrawer userData={user} />
		</div>
	);
};

export default Profile;

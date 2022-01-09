import { TextField, Divider, Button } from '@mui/material';
import {
	Email,
	AccountCircle,
	Send,
	People,
	Add,
	Delete,
} from '@mui/icons-material';
import { useState, useContext } from 'react';
import { EventContext } from '../../../context/EventContext';
import { SentimentDissatisfied as Sad } from '@mui/icons-material';
import GuestTable from './GuestTable';
import Alert from '../../Misc/Alert';

const Input = ({ label, helper, handleChange, error, value, icon }) => {
	return (
		<TextField
			value={value}
			error={error}
			helperText={error ? helper : null}
			label={label}
			autoComplete="off"
			size="small"
			sx={{
				width: '100%',
			}}
			onChange={(e) => handleChange(e.target.value)}
			InputProps={{
				endAdornment: {
					account: <AccountCircle className="text-gray-500" />,
					email: <Email className="text-gray-500" />,
				}[icon],
			}}
		/>
	);
};

const validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};

const Guests = () => {
	const {
		eventData: { guestList },
		setGuestList,
	} = useContext(EventContext);

	const [email, setEmail] = useState('');
	const [guest, setGuest] = useState('');
	const [emailError, setEmailError] = useState(false);
	const [nameError, setNameError] = useState(false);

	const addGuest = () => {
		if (email && guest) {
			if (validateEmail(email)) {
				let list = [...guestList];

				if (list.find((g) => g.email === email)) {
					setOpen(true);
					return;
				}

				list.push({ email, guest });

				setGuestList(list);
				setEmail('');
				setGuest('');
			} else {
				setEmailError(true);
			}
		} else {
			if (!email) {
				setEmailError(true);
			}
			if (!guest) {
				setNameError(true);
			}
		}
	};

	const [open, setOpen] = useState();

	const deleteGuests = () => {
		setGuestList([]);
	}

	return (
		<div className="flex flex-col gap-10 w-full px-10 items-center">
			<div className="w-screen fixed z-50">
				<Alert
					open={open}
					severity={'warning'}
					setOpen={setOpen}
					msg={'Guest email already exists'}
				/>
			</div>
			<div className="text-3xl relative montserrat font-semibold text-center text-gradient capitalize md:text-4xl">
				Guest List
			</div>
			<div className="border flex flex-col gap-6 max-w-sm px-10 py-6 rounded-xl shadow-md w-full items-center bg-gray-50">
				<Input
					label={'Name'}
					helper={'Enter a valid name'}
					handleChange={(val) => {
						setGuest(val);
						setNameError(false);
					}}
					value={guest}
					error={nameError}
					icon={'account'}
				/>
				<Input
					label={'Email'}
					helper={'Enter a valid email address'}
					handleChange={(val) => {
						setEmail(val);
						setEmailError(false);
					}}
					value={email}
					error={emailError}
					icon={'email'}
				/>
				<Button variant="contained" onClick={addGuest} endIcon={<Add />}>
					<span className="poppins capitalize">Add guest</span>
				</Button>
			</div>

			<Divider
				sx={{
					width: '100%',
				}}
			/>

			<div className="border justify-between text-gray-500 p-4 rounded-md flex w-full max-w-[700px]">
				<Button
					endIcon={<People />}
					variant="outlined"
					disableElevation
					color="primary"
				>
					{guestList.length}
				</Button>
				<Button
					endIcon={<Delete />}
					variant="contained"
					onClick={deleteGuests}
					color="error"
					disabled={guestList.length === 0}
				>
					<div className="capitalize">Delete all</div>
				</Button>
			</div>
			<div className="w-full max-w-[700px]">
				{guestList.length ? (
					<GuestTable guestList={guestList} setGuestList={setGuestList} />
				) : (
					<NoGuests />
				)}
			</div>
		</div>
	);
};

export default Guests;

const NoGuests = () => {
	return (
		<div className="text-gray-400 tracking-wide flex flex-col items-center gap-8 text-2xl mt-10">
			<div className={`montserrat`}>No guests invited</div>
			<Sad
				sx={{
					fontSize: '5rem',
				}}
			/>
		</div>
	);
};

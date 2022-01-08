import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import VenueTypeDropdown from './VenueTypeDropdown';
import { useState } from 'react';
import addVenue from '../../../config/api/venueAPI';
import { addUserVenue } from '../../../config/api/userVenueAPI';
import Alert from '../../Misc/Alert';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from 'uuid';
import { mutate } from 'swr';
import { UserContext } from '../../../context/Users';
import { useContext } from 'react';

const CssTextField = styled(TextField)({
	'& label.Mui-focused': {
		color: 'blue',
	},
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderColor: 'rgb(212, 212, 216)',
		},
		'&:hover fieldset': {
			borderColor: 'rgb(212, 212, 216)',
		},
		'&.Mui-focused fieldset': {
			borderColor: 'rgb(99, 102, 241)',
		},
	},
});

const DualInput = ({ label, phStart, phEnd, value, setValue }) => {
	return (
		<div>
			<label className="leading-7 capitalize text-sm text-gray-600">
				{label}
			</label>
			<div className="flex gap-4">
				<CssTextField
					type="text"
					autoComplete="off"
					required
					size="small"
					placeholder={phStart}
					value={value.start}
					onChange={(e) => {
						setValue({
							start: e.target.value,
							end: value.end,
						});
					}}
				/>
				<CssTextField
					type="text"
					autoComplete="off"
					required
					size="small"
					placeholder={phEnd}
					value={value.end}
					onChange={(e) => {
						setValue({
							start: value.start,
							end: e.target.value,
						});
					}}
				/>
			</div>
		</div>
	);
};

const SingleInput = ({ label, value, setValue }) => {
	return (
		<div>
			<label className="leading-7 capitalize text-sm text-gray-600">
				{label}
			</label>
			<div>
				<CssTextField
					value={value}
					onChange={(e) => setValue(e.target.value)}
					required
					size="small"
					fullWidth
					autoComplete="off"
				/>
			</div>
		</div>
	);
};

export default function AlertDialog({ open, setOpen }) {
	const [openAlert, setOpenAlert] = useState(false);
	const [success, setSuccess] = useState(false);
	const [venueType, setVenueType] = useState('');
	const [venueName, setVenueName] = useState('');
	const [venueAddress, setVenueAddress] = useState('');

	const [venueCity, setVenueCity] = useState('');
	const [venueMobile, setVenueMobile] = useState('');
	const [capacity, setCapacity] = useState({
		start: '',
		end: '',
	});
	const [venueImage, setVenueImage] = useState('');
	const [venuePrice, setVenuePrice] = useState({
		start: '',
		end: '',
	});

	const [loading, setLoading] = useState(false);
	const user = useContext(UserContext);

	const handleClose = () => {
		setOpen(false);
	};
	const handleConfirm = async () => {
		setLoading(true);
		const venue = {
			value: venueName,
			address: venueAddress,
			city: venueCity,
			capacity: `${Math.min(capacity.start, capacity.end)}-${Math.max(
				capacity.start,
				capacity.end
			)}`,
			display: 'https://via.placeholder.com/300x200',
			veg: venuePrice.start,
			nonveg: venuePrice.end,
		};
    
		const id = uuidv4();
		const res = await addVenue(venue, venueType.toLowerCase(), id);
		const res2 = await addUserVenue(venue, venueType.toLowerCase(), id);
		mutate(`/api/user/${user.uid}/uservenue`);

		setLoading(false);

		if (res && res2) {
			setSuccess(true);
			setOpenAlert(true);
			setOpen(false);
		} else {
			setSuccess(false);
			setOpenAlert(true);
			setOpen(false);
		}
	};

	return (
		<>
			<div>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					className="h-screen"
				>
					<div
						className="px-4 pt-4 font-medium text-2xl"
						id="alert-dialog-title"
					>
						{'Register Venue'}
					</div>
					<div className="px-4 py-2">
						<VenueTypeDropdown handleChange={setVenueType} value={venueType} />
						<SingleInput
							value={venueName}
							setValue={setVenueName}
							label="venue name"
						/>
						<SingleInput
							value={venueAddress}
							setValue={setVenueAddress}
							label="address"
						/>
						<SingleInput
							value={venueCity}
							setValue={setVenueCity}
							label="city"
						/>
						<SingleInput
							value={venueMobile}
							setValue={setVenueMobile}
							label="Mobile No"
						/>
						<DualInput
							value={capacity}
							setValue={setCapacity}
							phStart={'Min'}
							phEnd={'Max'}
							label="capacity"
						/>
						<SingleInput
							value={venueImage}
							setValue={setVenueImage}
							label="image url"
						/>
						<DualInput
							value={venuePrice}
							setValue={setVenuePrice}
							phStart={'veg'}
							phEnd={'non-veg'}
							label="price per plate"
						/>
					</div>
					<div className="flex justify-end gap-3 p-4">
						<Button onClick={handleClose}>
							<div className=" capitalize text-gray-500">Cancel</div>
						</Button>
						<LoadingButton
							variant="contained"
							onClick={handleConfirm}
							loading={loading}
						>
							<div className="capitalize text-gray-50">
								{loading ? '' : 'Confirm'}
							</div>
						</LoadingButton>
					</div>
				</Dialog>
			</div>
			{success ? (
				<Alert
					open={openAlert}
					severity={'success'}
					setOpen={setOpenAlert}
					msg={'Venue added successfully'}
				/>
			) : (
				<Alert
					open={openAlert}
					severity={'warning'}
					setOpen={setOpenAlert}
					msg={'Error adding venue'}
				/>
			)}
		</>
	);
}

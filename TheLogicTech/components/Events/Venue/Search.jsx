import { useState } from 'react';
import { TextField, Divider } from '@mui/material';
import ItemList from './ItemList';

const Question = ({ list, heading, label, search, weddingVenue }) => {
	const [value, setValue] = useState('');

	const handleVenueChange = (e) => {
		setValue(e.target.value.toLowerCase());
	};

	return (
		<div className="flex flex-col gap-10 px-6 w-full max-w-96">
			<div className="text-3xl relative montserrat font-semibold text-center text-gradient capitalize md:text-4xl underline">
				{heading}
			</div>
			<TextField
				label={label}
				variant="outlined"
				onChange={handleVenueChange}
				sx={{
					maxWidth: '30rem',
					width: '100%',
					marginInline: 'auto',
				}}
				helperText="Select location or search above"
			/>
			<Divider />
			<ItemList list={list} value={value} weddingVenue={weddingVenue} />
		</div>
	);
};

export default Question;

import Search from './Search';
import { Fab } from '@mui/material';
import { FilterIcon } from '@mui/icons-material';

const Venue = ({ venues, heading }) => {
	return (
		<>
			<Search
				search={true}
				list={venues}
				heading={heading}
				label="Venue"
				weddingVenue={true}
			/>
		</>
	);
};

export default Venue;

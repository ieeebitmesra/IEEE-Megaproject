import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Delete } from '@mui/icons-material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: '#155FFF',
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

export default function GuestTable({ guestList, setGuestList }) {
	const deleteGuest = (i) => {
		guestList.splice(i, 1);
		setGuestList(guestList);
	};
	return (
		<TableContainer component={Paper}>
			<Table
				stickyHeader
				sx={{ minWidth: 320, width: '100%', maxWidth: 700 }}
				aria-label="Guest List"
			>
				<TableHead>
					<TableRow>
						<StyledTableCell align="center">Name</StyledTableCell>
						<StyledTableCell align="center">Email</StyledTableCell>
						<StyledTableCell align="center"></StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{guestList.map((row, index) => (
						<StyledTableRow key={row.guest}>
							<StyledTableCell scope="row" align="center">
								{row.guest}
							</StyledTableCell>
							<StyledTableCell align="center">{row.email}</StyledTableCell>
							<StyledTableCell align="center">
								<div
									className="cursor-pointer"
									onClick={() => deleteGuest(index)}
								>
									<Delete />
								</div>
							</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

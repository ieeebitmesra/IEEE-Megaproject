import React, { useState } from 'react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import { Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from 'next/link';
import sendMail from '../../config/api/sendMail';
import { Send, Done } from '@mui/icons-material';

const Confirmation = ({ showConfirm, guestList }) => {
	const { width, height } = useWindowSize();
	const [loading, setLoading] = useState(false);
	const [invite, setInvite] = useState(true);
	const [error, setError] = useState(false);

	const sendInvites = async () => {
		if (!invite) return;
		setLoading(true);
		const res = await sendMail(guestList);
		setLoading(false);

		if (res) {
			setInvite(false);
		} else {
			setError(true);
		}
	};

	return (
		<>
			{showConfirm && (
				<div className="opacity-40 fixed inset-0 z-50 bg-gray-600">
					<Confetti numberOfPieces={100} width={width} height={height} />
				</div>
			)}
			<div
				className={` ${
					showConfirm ? ' flex ' : 'hidden'
				} justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none px-5 `}
			>
				<div className="relative mx-auto max-w-3xl bg-bgray-50 rounded-lg">
					<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
						<div className="flex flex-col">
							<svg
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 130.2 130.2"
								className="pt-6 pb-4 tick"
							>
								<circle
									className="path circle"
									fill="none"
									stroke="#73AF55"
									strokeWidth="6"
									strokeMiterlimit="10"
									cx="65.1"
									cy="65.1"
									r="62.1"
								/>
								<polyline
									className="path check"
									fill="none"
									stroke="#73AF55"
									strokeWidth="6"
									strokeLinecap="round"
									strokeMiterlimit="10"
									points="100.2,40.2 51.5,88.8 29.8,67.5 "
								/>
							</svg>
							<div className="flex items-center justify-between  rounded-t text-center">
								<h3 className="dancing text-4xl font-bold tracking-wide z-10 mx-auto">
									Congratulations
								</h3>
							</div>
							<div className="text-center text-sm text-gray-700 px-6 py-4">
								<p>Your booking has been confirmed.</p>
								<p>Check your email for additional details.</p>
							</div>
							<div className="text-center flex py-6 items-center justify-center flex-col gap-4 mx-auto">
								<LoadingButton
									variant="contained"
									className="poppins capitalize tracking-wider"
									color={error ? 'error' : invite ? 'secondary' : 'success'}
									onClick={sendInvites}
									loading={loading}
									endIcon={invite ? <Send /> : <Done />}
									disabled={guestList && guestList.length === 0}
								>
									<div className="poppins capitalize">
										{invite && !error ? 'Send Invites' : 'Invites Sent'}
										{error && 'Error'}
									</div>
								</LoadingButton>
								<Link href="/" passHref>
									<Button
										variant="contained"
										className="w-full poppins capitalize tracking-wider"
									>
										<div className="poppins capitalize">Home</div>
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Confirmation;
